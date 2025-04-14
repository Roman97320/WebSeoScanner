import { SeoElementDefinition } from "@/types";

// Define SEO elements to check - matches the client-side definitions
export const seoElements: SeoElementDefinition[] = [
  {
    id: "title-tag",
    name: "Title Tag",
    weight: 10,
    check: async (html: string) => {
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      
      if (!titleMatch || !titleMatch[1] || titleMatch[1].trim() === '') {
        return {
          score: 0,
          status: 'danger',
          currentValue: '<title></title>',
          recommendation: 'Add a descriptive, unique title between 50-60 characters. Include your primary keyword early in the title.',
          details: 'Your page is missing a title tag, which is one of the most important SEO elements. Search engines use this to display the title in search results.'
        };
      }
      
      const title = titleMatch[1].trim();
      const length = title.length;
      
      if (length < 10) {
        return {
          score: 20,
          status: 'danger',
          currentValue: `<title>${title}</title>`,
          recommendation: 'Your title is too short. Add a descriptive, unique title between 50-60 characters.',
          details: 'Short titles don\'t provide enough information to search engines or users about your page content.'
        };
      }
      
      if (length < 30) {
        return {
          score: 40,
          status: 'warning',
          currentValue: `<title>${title}</title>`,
          recommendation: 'Your title is a bit short. Consider expanding it to between 50-60 characters.',
          details: 'Longer titles (but still under 60 characters) provide more context to search engines and users.'
        };
      }
      
      if (length > 60) {
        return {
          score: 60,
          status: 'warning',
          currentValue: `<title>${title}</title>`,
          recommendation: 'Your title is too long. Search engines typically display only the first 50-60 characters.',
          details: 'Long titles get truncated in search results, potentially hiding important keywords.'
        };
      }
      
      return {
        score: 100,
        status: 'success',
        currentValue: `<title>${title}</title>`,
        recommendation: 'Your title tag is well-optimized.',
        details: 'Your title is between 50-60 characters, which is ideal for search engine display.'
      };
    }
  },
  {
    id: "meta-description",
    name: "Meta Description",
    weight: 8,
    check: async (html: string) => {
      const metaMatch = html.match(/<meta\s+name="description"\s+content="(.*?)".*?>/i) || 
                         html.match(/<meta\s+content="(.*?)"\s+name="description".*?>/i);
      
      if (!metaMatch || !metaMatch[1] || metaMatch[1].trim() === '') {
        return {
          score: 0,
          status: 'danger',
          currentValue: '<meta name="description" content="">',
          recommendation: 'Add a descriptive meta description between 150-160 characters that includes relevant keywords.',
          details: 'Your page is missing a meta description, which helps search engines understand your page content and impacts click-through rates.'
        };
      }
      
      const description = metaMatch[1].trim();
      const length = description.length;
      
      if (length < 70) {
        return {
          score: 58,
          status: 'warning',
          currentValue: `<meta name="description" content="${description}">`,
          recommendation: 'Your meta description is too short. Aim for 150-160 characters that include key terms.',
          details: 'Short meta descriptions don\'t provide enough information about your page content to encourage clicks from search results.'
        };
      }
      
      if (length > 160) {
        return {
          score: 70,
          status: 'warning',
          currentValue: `<meta name="description" content="${description.substring(0, 50)}...">`,
          recommendation: 'Your meta description is too long. Keep it under 160 characters to prevent truncation in search results.',
          details: 'Long meta descriptions get cut off in search results, potentially hiding important information.'
        };
      }
      
      return {
        score: 100,
        status: 'success',
        currentValue: `<meta name="description" content="${description}">`,
        recommendation: 'Your meta description is well-optimized.',
        details: 'Your meta description is between 150-160 characters, which is ideal for search engine display.'
      };
    }
  },
  {
    id: "h1-heading",
    name: "H1 Tag & Heading Hierarchy",
    weight: 9,
    check: async (html: string) => {
      const h1Matches = html.match(/<h1.*?>(.*?)<\/h1>/gi);
      
      if (!h1Matches || h1Matches.length === 0) {
        return {
          score: 0,
          status: 'danger',
          currentValue: 'No H1 tag found',
          recommendation: 'Add a single H1 tag that clearly describes your page\'s main topic and includes your primary keyword.',
          details: 'Your page is missing an H1 heading, which is crucial for search engines to understand your page\'s main topic.'
        };
      }
      
      if (h1Matches.length > 1) {
        return {
          score: 65,
          status: 'warning',
          currentValue: `Multiple H1 tags found (${h1Matches.length})`,
          recommendation: 'Use only one H1 tag per page to clearly identify the main topic.',
          details: 'Multiple H1 tags can confuse search engines about the main topic of your page.'
        };
      }
      
      // Check for proper heading hierarchy
      const h2Matches = html.match(/<h2.*?>(.*?)<\/h2>/gi);
      const h3Matches = html.match(/<h3.*?>(.*?)<\/h3>/gi);
      
      if (!h2Matches || h2Matches.length === 0) {
        return {
          score: 80,
          status: 'warning',
          currentValue: 'H1 tag found, but no H2 tags',
          recommendation: 'Add H2 tags for main sections of your content to establish proper heading hierarchy.',
          details: 'A proper heading hierarchy helps search engines understand your content structure.'
        };
      }
      
      return {
        score: 100,
        status: 'success',
        currentValue: 'Proper heading hierarchy found',
        recommendation: 'Your heading structure is well-organized.',
        details: 'Your page has a proper heading hierarchy with one H1 tag and appropriate H2/H3 tags.'
      };
    }
  },
  {
    id: "https-security",
    name: "Security & HTTPS",
    weight: 8,
    check: async (html: string, url: string) => {
      if (url.startsWith('https://')) {
        // Check for mixed content
        const httpResources = html.match(/src=["']http:\/\//gi) || [];
        const httpLinks = html.match(/href=["']http:\/\//gi) || [];
        const mixedContent = httpResources.length + httpLinks.length;
        
        if (mixedContent > 0) {
          return {
            score: 70,
            status: 'warning',
            currentValue: `HTTPS enabled with ${mixedContent} mixed content issues`,
            recommendation: 'Fix mixed content issues by updating HTTP links to HTTPS.',
            details: 'Your site uses HTTPS but includes resources loaded over unsecured HTTP connections.'
          };
        }
        
        return {
          score: 100,
          status: 'success',
          currentValue: 'HTTPS properly implemented',
          recommendation: 'Your site is properly secured with HTTPS.',
          details: 'Your site is properly secured with HTTPS and has no mixed content issues.'
        };
      }
      
      return {
        score: 0,
        status: 'danger',
        currentValue: 'No HTTPS detected',
        recommendation: 'Implement HTTPS to secure your site and improve search rankings.',
        details: 'Your site is not using HTTPS, which is a ranking factor for search engines and essential for security.'
      };
    }
  },
  {
    id: "image-optimization",
    name: "Image Optimization: Alt Text & File Names",
    weight: 7,
    check: async (html: string) => {
      const imgTags = html.match(/<img[^>]*>/gi) || [];
      
      if (imgTags.length === 0) {
        return {
          score: 100,
          status: 'success',
          currentValue: 'No images found on page',
          recommendation: 'No issues found.',
          details: 'Your page doesn\'t contain any images.'
        };
      }
      
      let imagesWithAlt = 0;
      let imagesWithoutAlt = 0;
      
      imgTags.forEach(img => {
        if (img.match(/alt=["'][^"']*["']/i)) {
          imagesWithAlt++;
        } else {
          imagesWithoutAlt++;
        }
      });
      
      const altTextPercentage = imagesWithAlt / imgTags.length * 100;
      
      if (altTextPercentage === 100) {
        return {
          score: 100,
          status: 'success',
          currentValue: `All ${imgTags.length} images have alt text`,
          recommendation: 'Your images are well-optimized for accessibility and SEO.',
          details: 'All images on your page have alt text, which is ideal for accessibility and SEO.'
        };
      }
      
      if (altTextPercentage >= 80) {
        return {
          score: 80,
          status: 'warning',
          currentValue: `${imagesWithAlt} of ${imgTags.length} images have alt text`,
          recommendation: 'Add descriptive alt text to all remaining images.',
          details: 'Most of your images have alt text, but some are still missing it.'
        };
      }
      
      return {
        score: 50,
        status: 'danger',
        currentValue: `${imagesWithoutAlt} of ${imgTags.length} images are missing alt text`,
        recommendation: 'Add descriptive alt text to all images to improve accessibility and SEO.',
        details: 'Many of your images are missing alt text, which is important for accessibility and SEO.'
      };
    }
  },
  {
    id: "mobile-friendliness",
    name: "Mobile-Friendliness",
    weight: 9,
    check: async (html: string) => {
      const viewportTag = html.match(/<meta\s+name=["']viewport["']\s+content=["'].*?["']\s*\/?>/i);
      
      if (!viewportTag) {
        return {
          score: 30,
          status: 'danger',
          currentValue: 'No viewport meta tag found',
          recommendation: 'Add a viewport meta tag for mobile responsiveness: <meta name="viewport" content="width=device-width, initial-scale=1">',
          details: 'Without a viewport meta tag, your site may not be properly optimized for mobile devices.'
        };
      }
      
      // Check for mobile-friendly elements
      const hasMediaQueries = html.includes('@media') || html.includes('max-width') || html.includes('min-width');
      const hasFlexbox = html.includes('display: flex') || html.includes('display:flex');
      const hasGrid = html.includes('display: grid') || html.includes('display:grid');
      
      if (hasMediaQueries && (hasFlexbox || hasGrid)) {
        return {
          score: 90,
          status: 'success',
          currentValue: 'Viewport tag and responsive design elements found',
          recommendation: 'Your site appears to be mobile-friendly.',
          details: 'Your page includes a viewport meta tag and uses responsive design techniques.'
        };
      }
      
      return {
        score: 70,
        status: 'warning',
        currentValue: 'Viewport tag found, but responsive elements may be limited',
        recommendation: 'Consider implementing more responsive design techniques like flexbox, grid, and media queries.',
        details: 'While your page has a viewport tag, it may not be fully responsive on all devices.'
      };
    }
  },
  {
    id: "page-speed",
    name: "Page Speed Factors",
    weight: 9,
    check: async (html: string) => {
      // This is a simplified check - a real implementation would use actual performance metrics
      const cssFiles = (html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).length;
      const jsFiles = (html.match(/<script[^>]*src=[^>]*>/gi) || []).length;
      const imageCount = (html.match(/<img[^>]*>/gi) || []).length;
      
      // Check for performance optimizations
      const hasLazyLoading = html.includes('loading="lazy"');
      const hasDeferJs = html.includes('defer');
      const hasAsyncJs = html.includes('async');
      
      const optimizationPoints = (hasLazyLoading ? 20 : 0) + 
                                 (hasDeferJs ? 15 : 0) + 
                                 (hasAsyncJs ? 15 : 0);
      
      // Penalize for excessive resources
      const resourcePenalty = Math.min(50, (cssFiles + jsFiles) * 5 + imageCount * 2);
      
      const score = Math.max(0, Math.min(100, 100 - resourcePenalty + optimizationPoints));
      
      if (score < 50) {
        return {
          score,
          status: 'danger',
          currentValue: `${cssFiles} CSS files, ${jsFiles} JS files, ${imageCount} images`,
          recommendation: 'Optimize images, minify CSS/JS, use lazy loading, defer non-critical JS, and reduce third-party scripts.',
          details: 'Your page has many resources that could slow down loading times.'
        };
      }
      
      if (score < 80) {
        return {
          score,
          status: 'warning',
          currentValue: `${cssFiles} CSS files, ${jsFiles} JS files, ${imageCount} images`,
          recommendation: 'Consider further optimization: combine CSS/JS files, optimize images, and implement lazy loading.',
          details: 'Your page has room for performance improvements.'
        };
      }
      
      return {
        score,
        status: 'success',
        currentValue: 'Good performance optimization',
        recommendation: 'Your page appears to be well-optimized for performance.',
        details: 'Your page uses performance best practices like minimizing resources and using async/defer for scripts.'
      };
    }
  },
  {
    id: "content-quality",
    name: "Keyword Usage & Content Relevance",
    weight: 9,
    check: async (html: string) => {
      // Extract text content
      const textContent = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      const wordCount = textContent.split(/\s+/).length;
      
      if (wordCount < 300) {
        return {
          score: 40,
          status: 'danger',
          currentValue: `${wordCount} words`,
          recommendation: 'Add more comprehensive content with at least 500-1000 words for better topical coverage.',
          details: 'Your page has thin content, which may not perform well in search results.'
        };
      }
      
      if (wordCount < 600) {
        return {
          score: 70,
          status: 'warning',
          currentValue: `${wordCount} words`,
          recommendation: 'Consider expanding your content to provide more comprehensive information.',
          details: 'Your page has moderate content length. More comprehensive content tends to rank better.'
        };
      }
      
      return {
        score: 90,
        status: 'success',
        currentValue: `${wordCount} words`,
        recommendation: 'Your content length is good. Ensure it provides valuable information and naturally incorporates relevant keywords.',
        details: 'Your page has substantial content, which is good for SEO.'
      };
    }
  },
  {
    id: "open-graph",
    name: "Open Graph & Social Meta Tags",
    weight: 6,
    check: async (html: string) => {
      const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
      const ogDescription = html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
      const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
      const twitterCard = html.match(/<meta\s+name=["']twitter:card["']\s+content=["'](.*?)["']/i);
      
      const tags = [ogTitle, ogDescription, ogImage, twitterCard].filter(Boolean).length;
      
      if (tags === 0) {
        return {
          score: 0,
          status: 'danger',
          currentValue: 'No Open Graph or Twitter Card tags found',
          recommendation: 'Add og:title, og:description, og:image, and twitter:card tags for better social sharing.',
          details: 'Your page is missing social media meta tags, which control how your content appears when shared on platforms like Facebook, Twitter, and LinkedIn.'
        };
      }
      
      if (tags < 3) {
        return {
          score: 40,
          status: 'warning',
          currentValue: `${tags} of 4 recommended social tags found`,
          recommendation: 'Add all recommended social tags: og:title, og:description, og:image, and twitter:card.',
          details: 'Your page is missing some important social media meta tags.'
        };
      }
      
      if (tags < 4) {
        return {
          score: 75,
          status: 'warning',
          currentValue: `${tags} of 4 recommended social tags found`,
          recommendation: 'Add the missing social tags for complete optimization.',
          details: 'Your page has most social media meta tags but is missing some for complete optimization.'
        };
      }
      
      return {
        score: 100,
        status: 'success',
        currentValue: 'All recommended social tags found',
        recommendation: 'Your social media tags are well-implemented.',
        details: 'Your page has all recommended social media meta tags, making it optimal for sharing on platforms like Facebook, Twitter, and LinkedIn.'
      };
    }
  },
  {
    id: "canonical-tag",
    name: "Canonical Tag",
    weight: 8,
    check: async (html: string, url: string) => {
      const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
      
      if (!canonicalMatch) {
        return {
          score: 30,
          status: 'warning',
          currentValue: 'No canonical tag found',
          recommendation: `Add a canonical tag: <link rel="canonical" href="${url}">`,
          details: 'Your page should have a canonical tag to prevent duplicate content issues, especially if your content can be accessed through multiple URLs.'
        };
      }
      
      const canonicalUrl = canonicalMatch[1];
      
      // Normalize URLs for comparison
      const normalizedCanonical = canonicalUrl.replace(/\/$/, '').toLowerCase();
      const normalizedUrl = url.replace(/\/$/, '').toLowerCase();
      
      if (normalizedUrl !== normalizedCanonical) {
        return {
          score: 50,
          status: 'warning',
          currentValue: `Canonical URL (${canonicalUrl}) differs from current URL (${url})`,
          recommendation: 'Ensure the canonical URL is correct, or update it if this is not the preferred version of the page.',
          details: 'The canonical URL is different from the current URL. This is okay if intentional, but verify this is the desired setup.'
        };
      }
      
      return {
        score: 100,
        status: 'success',
        currentValue: `Canonical URL properly set to ${canonicalUrl}`,
        recommendation: 'Your canonical tag is properly implemented.',
        details: 'Your page has a proper canonical tag that matches the current URL.'
      };
    }
  },
  {
    id: "url-structure",
    name: "URL Structure",
    weight: 8,
    check: async (html: string, url: string) => {
      // Remove protocol and domain
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;
      
      // Check for URL issues
      const hasUppercase = /[A-Z]/.test(path);
      const hasSpecialChars = /[^a-zA-Z0-9\-\_\/\.]/.test(path);
      const hasUnderscores = path.includes('_');
      const segmentCount = path.split('/').filter(Boolean).length;
      const isDynamicUrl = path.includes('.php') || path.includes('.asp') || path.includes('.jsp') || /[?&]/.test(url);
      
      let issues = [];
      if (hasUppercase) issues.push('Contains uppercase letters');
      if (hasSpecialChars) issues.push('Contains special characters');
      if (hasUnderscores) issues.push('Contains underscores');
      if (segmentCount > 3) issues.push('Excessively nested URL');
      if (isDynamicUrl) issues.push('Dynamic URL parameters');
      
      if (issues.length === 0) {
        return {
          score: 100,
          status: 'success',
          currentValue: url,
          recommendation: 'Your URL structure is well-optimized.',
          details: 'Your URL follows SEO best practices: all lowercase, uses hyphens, and has a clean structure.'
        };
      }
      
      if (issues.length === 1 && (hasUnderscores || segmentCount > 3)) {
        return {
          score: 80,
          status: 'warning',
          currentValue: `URL issues: ${issues.join(', ')}`,
          recommendation: hasUnderscores 
            ? 'Consider using hyphens instead of underscores in URLs.'
            : 'Consider flattening your URL structure for improved crawlability.',
          details: 'Your URL is generally good but has minor issues that could be improved.'
        };
      }
      
      return {
        score: 60,
        status: 'warning',
        currentValue: `URL issues: ${issues.join(', ')}`,
        recommendation: 'Create clean, descriptive URLs using lowercase letters, hyphens instead of underscores, and avoid unnecessary parameters.',
        details: 'Your URL has multiple issues that could impact SEO performance.'
      };
    }
  }
];
