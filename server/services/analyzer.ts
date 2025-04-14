import fetch from "node-fetch";
import { InsertSeoAnalysis } from "@shared/schema";
import { seoElements } from "./seoUtils";

export async function analyzeUrl(url: string): Promise<InsertSeoAnalysis> {
  try {
    // Fetch the URL's HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'SEO-Analyzer/1.0 (https://seoanalyzer.example.com/bot; bot@example.com)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Get favicon URL
    let favicon = null;
    try {
      const domain = new URL(url).hostname;
      favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
      // Test if favicon is accessible
      await fetch(favicon);
    } catch (error) {
      console.error("Error fetching favicon:", error);
      favicon = null;
    }
    
    // Extract title for SERP preview
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "No title found";
    
    // Extract meta description for SERP preview
    const metaMatch = html.match(/<meta\s+name="description"\s+content="(.*?)".*?>/i) || 
                      html.match(/<meta\s+content="(.*?)"\s+name="description".*?>/i);
    const description = metaMatch ? metaMatch[1].trim() : "No description found";
    
    // Extract Open Graph data for social preview
    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
    const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
    
    const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : title;
    const ogDescription = ogDescMatch ? ogDescMatch[1].trim() : description;
    const ogImage = ogImageMatch ? ogImageMatch[1].trim() : null;
    
    // Process all SEO elements
    const elementResults = await Promise.all(
      seoElements.map(async element => {
        try {
          const result = await element.check(html, url);
          return {
            id: element.id,
            name: element.name,
            weight: element.weight,
            score: result.score,
            status: result.status,
            currentValue: result.currentValue,
            recommendation: result.recommendation,
            details: result.details
          };
        } catch (error) {
          console.error(`Error analyzing ${element.name}:`, error);
          return {
            id: element.id,
            name: element.name,
            weight: element.weight,
            score: 0,
            status: 'danger' as const,
            details: `Error analyzing this element: ${error instanceof Error ? error.message : 'Unknown error'}`
          };
        }
      })
    );
    
    // Calculate overall score with weights
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    elementResults.forEach(element => {
      totalWeightedScore += element.score * element.weight;
      totalWeight += element.weight;
    });
    
    const overallScore = Math.round(totalWeightedScore / totalWeight);
    
    // Count issues by severity
    const passedCount = elementResults.filter(el => el.status === 'success').length;
    const warningCount = elementResults.filter(el => el.status === 'warning').length;
    const criticalCount = elementResults.filter(el => el.status === 'danger').length;
    
    // Generate executive summary
    const executiveSummary = generateExecutiveSummary(elementResults);
    
    // Build the analysis object
    const analysis: InsertSeoAnalysis = {
      url,
      timestamp: new Date(),
      overallScore,
      passedCount,
      warningCount,
      criticalCount,
      executiveSummary,
      seoElements: elementResults,
      serp: {
        title,
        url,
        description
      },
      social: {
        title: ogTitle,
        description: ogDescription,
        imageUrl: ogImage
      },
      favicon,
      html
    };
    
    return analysis;
  } catch (error) {
    throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function generateExecutiveSummary(elements: any[]) {
  // Sort elements by status (critical first, then warnings, then successes)
  // and by score within each status group
  const sortedElements = [...elements].sort((a, b) => {
    const statusPriority = { danger: 0, warning: 1, success: 2 };
    const statusDiff = statusPriority[a.status] - statusPriority[b.status];
    
    if (statusDiff !== 0) return statusDiff;
    return a.score - b.score; // Lower scores first within same status
  });
  
  // Get top issues
  const criticalIssues = sortedElements.filter(el => el.status === 'danger').slice(0, 2);
  const warnings = sortedElements.filter(el => el.status === 'warning').slice(0, 2);
  const successes = sortedElements.filter(el => el.status === 'success').slice(0, 1);
  
  const summary = [
    ...criticalIssues.map(el => ({
      status: 'danger' as const,
      text: `${el.name}: ${el.details || el.recommendation || 'Needs attention'}`
    })),
    ...warnings.map(el => ({
      status: 'warning' as const,
      text: `${el.name}: ${el.details || el.recommendation || 'Could be improved'}`
    })),
    ...successes.map(el => ({
      status: 'success' as const,
      text: `${el.name}: ${el.details || 'Well optimized'}`
    }))
  ];
  
  return summary;
}
