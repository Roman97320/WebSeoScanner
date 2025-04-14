import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

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
    <section className="relative bg-gradient-to-r from-primary to-primary-hover py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-white"></div>
        <div className="absolute right-1/4 bottom-1/3 h-40 w-40 rounded-full bg-white"></div>
        <div className="absolute left-1/4 bottom-1/4 h-32 w-32 rounded-full bg-white"></div>
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white animate-fade-in mb-6">
            Boost Your Website's Visibility With Our SEO Analyzer
          </h1>
          <p className="mt-4 text-xl text-white/90">
            Get a comprehensive SEO audit report with data-driven insights to climb search rankings.
          </p>
        </div>
        
        <div className="mt-10 max-w-3xl mx-auto">
          <form className="flex flex-col sm:flex-row shadow-xl rounded-lg overflow-hidden" onSubmit={handleSubmit}>
            <input 
              type="url" 
              placeholder="Enter website URL (e.g., https://example.com)" 
              className="flex-grow py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-lg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-accent text-foreground hover:bg-accent/90 font-bold py-4 px-8 text-lg transition-all duration-200 h-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin mr-2 h-5 w-5 border-2 border-b-transparent border-current rounded-full"></div>
              ) : (
                <i className="ri-search-line mr-2"></i>
              )}
              {isLoading ? "Analyzing..." : "Analyze My Site"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-white/80 text-center">
            We'll analyze 20 key SEO factors and provide actionable recommendations
          </p>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-white/90">
          <div className="flex items-center">
            <i className="ri-shield-check-line text-2xl mr-2"></i>
            <span>Secure Analysis</span>
          </div>
          <div className="flex items-center">
            <i className="ri-time-line text-2xl mr-2"></i>
            <span>Results in Seconds</span>
          </div>
          <div className="flex items-center">
            <i className="ri-lock-line text-2xl mr-2"></i>
            <span>Private & Confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrlInput;
