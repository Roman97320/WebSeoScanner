import { useState, useRef, useEffect } from "react";
import UrlInput from "@/components/UrlInput";

const Home = () => {
  const [visibleSections, setVisibleSections] = useState<{[key: string]: boolean}>({
    features: false,
    process: false,
    toolkit: false,
    showAllTools: false
  });

  const sectionRefs = {
    features: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    toolkit: useRef<HTMLDivElement>(null)
  };

  // Intersection Observer to handle animations when sections come into view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => ({ ...prev, [key]: true }));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl animate-float-medium"></div>

      <UrlInput />

      {/* Feature Cards */}
      <section 
        ref={sectionRefs.features} 
        className="py-16 bg-gray-50 relative z-10"
      >
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${
          visibleSections.features ? "opacity-100" : "opacity-0 translate-y-10"
        }`}>
          <div className="text-center mb-12 relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <i className="ri-search-line text-2xl text-primary"></i>
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-4 pt-12">
              Why Our SEO & Code Analyzer?
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
              Tired of juggling multiple tools and complicated reports? Our all-in-one SEO solution delivers a clear, concise 
              analysis of your site's performance—so you can focus on the strategies that truly matter.
            </p>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Instant Insights",
                description: "No wait times. Get a snapshot of your site's health right away."
              },
              {
                title: "Comprehensive Coverage",
                description: "Technical, on-page, and off-page factors all in a single report."
              },
              {
                title: "Action-Oriented",
                description: "We don't just highlight issues — we show you exactly how to fix them."
              },
              {
                title: "User-Friendly Interface",
                description: "Designed for marketers, developers, and everyone in between."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: visibleSections.features ? 1 : 0,
                  transform: visibleSections.features ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease-out ${index * 150}ms`
                }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section 
        ref={sectionRefs.process} 
        className="py-16 bg-white relative z-10"
      >
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${
          visibleSections.process ? "opacity-100" : "opacity-0 translate-y-10"
        }`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Path to Better Rankings</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Process connector line */}
            <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-0.5 bg-gray-200">
              <div className={`h-full bg-primary transition-all duration-1500 ease-in-out`} 
                style={{ width: visibleSections.process ? '100%' : '0%' }}></div>
            </div>

            {[
              {
                number: 1,
                title: "Enter Your URL",
                description: "Just paste your website link into our analyzer."
              },
              {
                number: 2,
                title: "Scan & Generate",
                description: "We'll analyze your site's SEO and code structure."
              },
              {
                number: 3,
                title: "Review Results",
                description: "Get a clear report highlighting key improvements."
              },
              {
                number: 4,
                title: "Take Action",
                description: "Follow our recommendations to boost rankings."
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm text-center group hover:shadow-md transition-shadow"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  opacity: visibleSections.process ? 1 : 0,
                  transform: visibleSections.process ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease-out ${index * 200}ms`
                }}
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Your All-in-One SEO Toolkit */}
      <section 
        ref={sectionRefs.toolkit} 
        className="py-12 bg-white relative z-10"
      >
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl transition-all duration-1000 ${
          visibleSections.toolkit ? "opacity-100" : "opacity-0 translate-y-10"
        }`}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Your All-in-One SEO Toolkit</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Our analyzer checks all 20 critical SEO elements to give you a comprehensive overview of your website's performance.
            </p>
          </div>

          <div className={`grid md:grid-cols-3 ${visibleSections.showAllTools ? 'lg:grid-cols-4' : ''} gap-6`}>
            {[
              // High Priority Elements
              {
                title: "1. Title Tag",
                description: "Analysis of length, keyword placement, and uniqueness across your site.",
                priority: "high"
              },
              {
                title: "2. Meta Description",
                description: "Evaluation of compelling descriptions that drive clicks from search results.",
                priority: "high"
              },
              {
                title: "3. H1 & Heading Structure",
                description: "Checking hierarchy and proper organization of content sections.",
                priority: "high"
              },
              {
                title: "4. Keyword Usage",
                description: "Identification of optimal keyword placement, density, and relevance.",
                priority: "high"
              },
              {
                title: "5. URL Structure",
                description: "Examination of URL clarity, length, and keyword inclusion.",
                priority: "high"
              },
              {
                title: "6. Canonical Tags",
                description: "Validation of proper implementation to avoid duplicate content issues.",
                priority: "high"
              },

              // Technical Elements
              {
                title: "7. Meta Robots & Indexing",
                description: "Verification of correct indexing directives for search engines.",
                priority: "medium"
              },
              {
                title: "8. Image Optimization",
                description: "Audit of alt text, file names, and compression for accessibility.",
                priority: "medium"
              },
              {
                title: "9. Structured Data",
                description: "Checking schema markup for rich results and enhanced SERP features.",
                priority: "medium"
              },
              {
                title: "10. Internal Linking",
                description: "Evaluation of site link structure and content relationship signals.",
                priority: "medium"
              },
              {
                title: "11. External Linking",
                description: "Analysis of outbound links to authoritative sources.",
                priority: "medium"
              },
              {
                title: "12. Open Graph & Social",
                description: "Validation of social meta tags for optimal sharing appearance.",
                priority: "medium"
              },

              // Additional Elements
              {
                title: "13. Language Attributes",
                description: "Verification of proper language declarations and hreflang tags.",
                priority: "low"
              },
              {
                title: "14. Mobile-Friendliness",
                description: "Testing responsive design on various screen sizes.",
                priority: "low"
              },
              {
                title: "15. Page Speed",
                description: "Identification of performance issues affecting Core Web Vitals.",
                priority: "low"
              },
              {
                title: "16. Security & HTTPS",
                description: "Verification of secure connections and SSL implementation.",
                priority: "low"
              },
              {
                title: "17. HTML Validation",
                description: "Checking code cleanliness for better rendering and crawling.",
                priority: "low"
              },
              {
                title: "18. Robots.txt & Sitemap",
                description: "Review of crawl directives and proper sitemap configuration.",
                priority: "low"
              },
              {
                title: "19. 404 & Redirects",
                description: "Identification of broken links and proper redirection setup.",
                priority: "low"
              },
              {
                title: "20. Favicon & Branding",
                description: "Checking for consistent brand elements across the site.",
                priority: "low"
              }
            ].slice(0, visibleSections.showAllTools ? undefined : 6).map((tool, index) => (
              <div 
                key={index}
                className={`border border-gray-200 p-4 bg-white hover:border-primary hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 rounded-lg ${
                  tool.priority === 'high' ? 'border-l-4 border-l-primary' : 
                  tool.priority === 'medium' ? 'border-l-4 border-l-warning' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  opacity: visibleSections.toolkit ? 1 : 0,
                  transform: visibleSections.toolkit ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease-out ${index * 50}ms`
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="flex-shrink-0 text-sm font-medium text-primary/70 bg-primary/5 px-2 py-1 rounded">
                    {tool.title.split('.')[0]}.
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                    {tool.title.split('.')[1]}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">{tool.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button 
              className="inline-flex items-center px-6 py-3 border border-primary/20 rounded-lg text-primary hover:bg-primary/5 transition-colors duration-300"
              onClick={() => setVisibleSections(prev => ({ ...prev, showAllTools: !prev.showAllTools }))}
            >
              {visibleSections.showAllTools ? (
                <>
                  Show Less
                  <i className="ri-arrow-up-line ml-2"></i>
                </>
              ) : (
                <>
                  See All 20 SEO Checks
                  <i className="ri-arrow-down-line ml-2"></i>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Moving particles background effect */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-primary/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animation: `float-slow ${6 + Math.random() * 5}s linear infinite`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;