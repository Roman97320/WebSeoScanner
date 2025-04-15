import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const demoPlaceholders = [
    "example.com",
    "yourwebsite.com",
    "yourblog.com",
    "yourstore.com"
  ];
  
  // Simulated typing effect for placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % demoPlaceholders.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }
    
    // Basic validation - ensure URL has a protocol
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }
    
    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/analyze", { url: formattedUrl });
      const result = await response.json();
      
      // Navigate to the report page
      navigate(`/report/${result.id}`);
    } catch (error) {
      console.error("Error analyzing URL:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze the URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white py-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-12 h-12 bg-primary/5 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-primary/5 rounded-full animate-float-medium"></div>
      <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-primary/5 rounded-full animate-float-fast"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-slide-down">
            Scan, Analyze, Implement!
          </h1>
          <p className="text-gray-600 mb-8 animate-slide-up">
            Analyze your website's SEO performance and get actionable recommendations to
            improve your search engine rankings.
          </p>
          
          <div className="max-w-lg mx-auto">
            <form 
              className={`flex flex-col sm:flex-row rounded-md shadow-sm overflow-hidden border transition-all duration-300 ${
                isFocused ? "border-primary shadow-md" : "border-gray-200"
              }`}
              onSubmit={handleSubmit}
            >
              <input 
                type="url" 
                placeholder={`Enter website URL (e.g., ${demoPlaceholders[typingIndex]})`} 
                className="flex-grow py-3 px-4 focus:outline-none text-gray-700 text-sm border-0 transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-4 text-sm transition-all sm:w-auto w-full hover:shadow-lg transform hover:-translate-y-0.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                    Analyzing...
                  </span>
                ) : "Analyze Now"}
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-400 animate-pulse">
              Enter any website URL to get a detailed SEO analysis report
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrlInput;
