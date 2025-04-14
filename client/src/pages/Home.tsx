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



      {/* Your All-in-One SEO Toolkit */}
      <section 
        ref={sectionRefs.toolkit} 
        className="py-16 bg-gradient-to-b from-white to-gray-50 relative z-10"
      >
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl transition-all duration-1000 ${
          visibleSections.toolkit ? "opacity-100" : "opacity-0 translate-y-10"
        }`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your All-in-One SEO Toolkit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive tools to analyze and optimize every aspect of your website's search engine performance.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Metadata Checker",
                description: "Audit titles, descriptions, and keyword usage for maximum SERP impact."
              },
              {
                title: "Page Speed Optimization",
                description: "Pinpoint performance bottlenecks and keep visitors (and search engines) happy."
              },
              {
                title: "Mobile-Friendliness",
                description: "Ensure your website is fully responsive and meets Google's mobile-first criteria."
              },
              {
                title: "Security & SSL Monitoring",
                description: "Build trust by confirming your site is secure and properly certified."
              },
              {
                title: "Backlink Insights",
                description: "Track inbound links and discover areas to strengthen your site building strategy."
              },
              {
                title: "Content Optimization",
                description: "Analyze your content for readability, keyword usage, and engagement potential."
              },
              {
                title: "+ More Features",
                description: "Discover additional checks running in the background, including schema markup, Core Web Vitals, and more.",
                isMoreCard: true
              }
            ].map((tool, index) => (
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