import { useState, useRef, useEffect } from "react";
import UrlInput from "@/components/UrlInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Home = () => {
  const [visibleSections, setVisibleSections] = useState<{[key: string]: boolean}>({
    features: false,
    process: false,
    path: false,
    toolkit: false
  });

  const sectionRefs = {
    features: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    path: useRef<HTMLDivElement>(null),
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

  const [showDialog, setShowDialog] = useState(false);
  const additionalTools = [
    {
      title: "Schema Markup",
      description: "Analyze your schema markup for correctness and optimization."
    },
    {
      title: "Core Web Vitals",
      description: "Check your site's performance metrics for a better user experience."
    },
    // Add more tools as needed
  ];

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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Our SEO & Code Analyzer?</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Tired of juggling multiple tools and complicated reports? Our all-in-one SEO solution delivers a clear, concise 
              analysis of your site's performance—so you can focus on the strategies that truly matter.
            </p>
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



      {/* Analysis Features */}
      <section 
        ref={sectionRefs.toolkit} 
        className="py-16 bg-gradient-to-b from-white to-gray-50 relative z-10"
      >
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl transition-all duration-1000 ${
          visibleSections.toolkit ? "opacity-100" : "opacity-0 translate-y-10"
        }`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Comprehensive Analysis Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Click on each feature to learn more about what we analyze during your website scan.</p>
          </div>

          <div className="grid gap-4 max-w-3xl mx-auto">
            {[
              {
                title: "Technical SEO Analysis",
                icon: "ri-code-line",
                description: "In-depth scanning of your website's technical foundation including load speed, mobile responsiveness, and SSL security status.",
                items: ["Page Load Speed", "Mobile Optimization", "SSL Certificate", "Robots.txt", "XML Sitemap"]
              },
              {
                title: "Content & Meta Analysis",
                icon: "ri-article-line",
                description: "Comprehensive review of your content structure and meta information for search engine optimization.",
                items: ["Meta Titles & Descriptions", "Heading Structure", "Keyword Density", "Content Quality", "Image Alt Tags"]
              },
              {
                title: "User Experience Checks",
                icon: "ri-user-smile-line",
                description: "Evaluation of factors that impact visitor engagement and satisfaction.",
                items: ["Mobile Friendliness", "Navigation Structure", "Page Load Time", "Interactive Elements", "Viewport Configuration"]
              },
              {
                title: "Link Structure Analysis",
                icon: "ri-links-line",
                description: "Assessment of internal and external link profile for optimal site structure.",
                items: ["Internal Links", "External Links", "Broken Links", "Anchor Text", "URL Structure"]
              },
              {
                title: "Performance Metrics",
                icon: "ri-speed-line",
                description: "Analysis of core web vitals and performance indicators crucial for SEO.",
                items: ["Core Web Vitals", "Server Response Time", "TTFB", "Resource Optimization", "Caching Status"]
              }
            ].map((feature, index) => (
              <Collapsible
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between text-left">
                  <div className="flex items-center space-x-3">
                    <i className={`${feature.icon} text-xl text-primary`}></i>
                    <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                  </div>
                  <i className="ri-arrow-down-s-line text-xl text-gray-400 transition-transform group-data-[state=open]:rotate-180"></i>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <p className="text-gray-600 mb-3">{feature.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                        <i className="ri-checkbox-circle-line text-primary mr-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
              <div 
                key={index}
                className={`rounded-xl border ${tool.isMoreCard ? 'border-primary/30 bg-primary/5' : 'border-gray-200 bg-white'} p-6 hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: visibleSections.toolkit ? 1 : 0,
                  transform: visibleSections.toolkit ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease-out ${index * 100}ms`
                }}
              >
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                  <DialogTrigger asChild>
                    <h3 className="font-semibold text-gray-800 mb-3">{tool.title}</h3>
                  </DialogTrigger>
                  <DialogContent className="w-96">
                    <DialogHeader>
                      <DialogTitle>More Features</DialogTitle>
                      <DialogDescription>
                        Additional SEO checks
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4">
                      {additionalTools.map((addTool, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-gray-800">{addTool.title}</h4>
                          <p className="text-gray-600">{addTool.description}</p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <p className="text-sm text-gray-600">
                  {tool.description}
                </p>
              </div>
            ))}
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