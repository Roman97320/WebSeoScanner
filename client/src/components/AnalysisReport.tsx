import { useState } from "react";
import { AnalysisResult } from "@/types";
import ScoreChart from "./ScoreChart";
import ExecutiveSummary from "./ExecutiveSummary";
import SeoElementItem from "./SeoElementItem";
import PreviewCards from "./PreviewCards";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface AnalysisReportProps {
  result: AnalysisResult;
  isLoading: boolean;
}

const AnalysisReport = ({ result, isLoading }: AnalysisReportProps) => {
  const [expandedElements, setExpandedElements] = useState<string[]>([]);
  const [showAllElements, setShowAllElements] = useState(false);
  
  const toggleElement = (elementId: string) => {
    setExpandedElements(prev => 
      prev.includes(elementId) 
        ? prev.filter(id => id !== elementId) 
        : [...prev, elementId]
    );
  };
  
  const handleReanalyze = () => {
    window.location.reload();
  };
  
  // Initially show only elements with critical issues, warnings, or top successes
  const displayedElements = showAllElements 
    ? result.seoElements 
    : result.seoElements.filter((element, index) => 
        element.status === 'danger' || 
        element.status === 'warning' || 
        (element.status === 'success' && index < 6)
      );

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-pulse">Loading analysis results...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* URL Banner */}
        <div className="mb-10 card shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Analysis Results</h1>
              <div className="flex items-center">
                {result.favicon && (
                  <img src={result.favicon} alt="Website favicon" className="h-6 w-6 mr-3" />
                )}
                <Link href="/" className="mr-2 text-gray-500 hover:text-primary">
                  <i className="ri-home-line"></i>
                </Link>
                <i className="ri-arrow-right-s-line text-gray-400 mr-2"></i>
                <span className="text-primary font-medium">{result.url}</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-wrap md:flex-nowrap items-center gap-4">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                <i className="ri-time-line mr-1"></i> {new Date(result.timestamp).toLocaleString()}
              </span>
              <Button 
                variant="outline" 
                className="text-gray-600"
                onClick={() => {
                  // In a real app, this would generate a PDF report
                  alert("PDF export functionality would be implemented here");
                }}
              >
                <i className="ri-file-download-line mr-2"></i> Export PDF
              </Button>
              <Button onClick={handleReanalyze} className="bg-primary hover:bg-primary-hover text-white">
                <i className="ri-refresh-line mr-2"></i> Reanalyze
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Score Card */}
        <div className="mb-10 card shadow-md">
          <div className="p-6 flex flex-col lg:flex-row items-center justify-between">
            {/* Score Visualization */}
            <div className="w-56 h-56 mb-8 lg:mb-0 lg:mr-10 relative flex-shrink-0">
              <ScoreChart score={result.overallScore} />
            </div>
            
            {/* Score Summary */}
            <div className="flex-grow max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">
                {result.overallScore >= 80 ? "Excellent SEO Performance!" : 
                 result.overallScore >= 60 ? "Good SEO Performance" :
                 result.overallScore >= 40 ? "SEO Needs Improvement" : 
                 "Critical SEO Issues Detected"}
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                {result.overallScore >= 80 ? 
                  "Your website demonstrates strong SEO fundamentals across most key areas. Keep up the good work!" : 
                  result.overallScore >= 60 ? 
                  "Your website has strong SEO fundamentals, but there are several opportunities to improve your search visibility and user experience." :
                  result.overallScore >= 40 ? 
                  "Your website has significant SEO issues that are likely impacting your search performance and user experience." :
                  "Your website has critical SEO problems that require immediate attention to improve search visibility."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-gradient-to-br from-green-50 to-green-100 border-none p-5">
                  <div className="text-success text-2xl font-bold">{result.passedCount}</div>
                  <div className="text-sm text-gray-600 mt-1 flex items-center">
                    <i className="ri-check-line mr-1"></i> Passed Checks
                  </div>
                </div>
                <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-none p-5">
                  <div className="text-warning text-2xl font-bold">{result.warningCount}</div>
                  <div className="text-sm text-gray-600 mt-1 flex items-center">
                    <i className="ri-alert-line mr-1"></i> Warnings
                  </div>
                </div>
                <div className="card bg-gradient-to-br from-red-50 to-red-100 border-none p-5">
                  <div className="text-destructive text-2xl font-bold">{result.criticalCount}</div>
                  <div className="text-sm text-gray-600 mt-1 flex items-center">
                    <i className="ri-error-warning-line mr-1"></i> Critical Issues
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Report Tabs */}
        <div className="card shadow-md overflow-hidden">
          <Tabs defaultValue="summary" className="w-full">
            <div className="bg-background/50 px-4 pt-2 border-b border-border">
              <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex h-auto bg-transparent gap-2">
                <TabsTrigger 
                  value="summary" 
                  className="py-3 px-4 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent flex items-center"
                >
                  <i className="ri-dashboard-line mr-2 text-lg"></i>
                  Summary
                </TabsTrigger>
                <TabsTrigger 
                  value="seo" 
                  className="py-3 px-4 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent flex items-center"
                >
                  <i className="ri-search-line mr-2 text-lg"></i>
                  SEO Factors
                </TabsTrigger>
                <TabsTrigger 
                  value="technical" 
                  className="py-3 px-4 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent flex items-center"
                >
                  <i className="ri-code-s-slash-line mr-2 text-lg"></i>
                  Technical
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="summary" className="p-8">
              {/* Executive Summary */}
              <ExecutiveSummary summary={result.executiveSummary} />
              
              {/* SEO Elements Scores (Top Issues) */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6">Key SEO Elements</h3>
                <div className="space-y-4">
                  {displayedElements.map(element => (
                    <SeoElementItem 
                      key={element.id}
                      element={element}
                      isExpanded={expandedElements.includes(element.id)}
                      onToggle={() => toggleElement(element.id)}
                    />
                  ))}
                </div>
                {!showAllElements && result.seoElements.length > displayedElements.length && (
                  <div className="text-center mt-8">
                    <Button 
                      variant="outline"
                      className="text-primary hover:text-primary-hover font-medium border-primary/20 hover:border-primary/50"
                      onClick={() => setShowAllElements(true)}
                    >
                      <span>View All {result.seoElements.length} SEO Elements</span>
                      <i className="ri-arrow-down-s-line ml-2"></i>
                    </Button>
                  </div>
                )}
              </div>
              
              {/* SERP Preview */}
              <PreviewCards serp={result.serp} social={result.social} />
            </TabsContent>
            
            <TabsContent value="seo" className="p-8">
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6">On-Page SEO Factors</h3>
                <div className="space-y-4">
                  {result.seoElements
                    .filter(el => 
                      ['title-tag', 'meta-description', 'h1-heading', 'content-quality', 
                       'url-structure', 'canonical-tag', 'image-optimization'].includes(el.id)
                    )
                    .map(element => (
                      <SeoElementItem 
                        key={element.id}
                        element={element}
                        isExpanded={expandedElements.includes(element.id)}
                        onToggle={() => toggleElement(element.id)}
                      />
                    ))
                  }
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-8">
                <div className="flex items-start">
                  <i className="ri-lightbulb-line text-primary text-xl mt-0.5 mr-3"></i>
                  <div>
                    <h4 className="font-medium mb-1">Pro Tip: On-Page SEO Best Practices</h4>
                    <p className="text-gray-600">Optimizing on-page elements like titles, meta descriptions, and headings has the most direct impact on your search engine visibility. Focus on these elements first for quick wins.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="p-8">
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6">Technical SEO Factors</h3>
                <div className="space-y-4">
                  {result.seoElements
                    .filter(el => 
                      ['https-security', 'mobile-friendliness', 'page-speed', 'open-graph'].includes(el.id)
                    )
                    .map(element => (
                      <SeoElementItem 
                        key={element.id}
                        element={element}
                        isExpanded={expandedElements.includes(element.id)}
                        onToggle={() => toggleElement(element.id)}
                      />
                    ))
                  }
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start">
                  <i className="ri-lightbulb-line text-primary text-xl mt-0.5 mr-3"></i>
                  <div>
                    <h4 className="font-medium mb-1">Pro Tip: Technical SEO Importance</h4>
                    <p className="text-gray-600">Technical factors like page speed, mobile-friendliness, and secure connections (HTTPS) are now major ranking factors. Google's Core Web Vitals update made these elements even more critical.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Preview Section */}
        <div className="mt-10 p-5 card shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Why These Previews Matter</h3>
          <p className="text-gray-600">
            The way your page appears in search results and social shares can drastically impact click-through rates. 
            Well-crafted titles and descriptions not only help with SEO but also encourage users to visit your site.
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-primary/10 rounded-full p-2 mr-3 text-primary">
                <i className="ri-search-eye-line text-lg"></i>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Search Results Preview</h4>
                <p className="text-sm text-gray-600">Show how your page appears in Google search results.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 rounded-full p-2 mr-3 text-primary">
                <i className="ri-share-forward-line text-lg"></i>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Social Media Preview</h4>
                <p className="text-sm text-gray-600">See how your content appears when shared on social platforms.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="mt-10 text-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-6 h-auto text-lg">
              <i className="ri-radar-line mr-2"></i> Analyze Another Website
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AnalysisReport;
