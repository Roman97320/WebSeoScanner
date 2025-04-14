import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

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
    <section className="bg-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            WebSeoScan
          </h1>
          <p className="text-gray-600 mb-8">
            Analyze your website's SEO performance and get actionable recommendations to
            improve your search engine rankings.
          </p>
          
          <div className="max-w-lg mx-auto">
            <form 
              className="flex flex-col sm:flex-row rounded-md shadow-sm overflow-hidden border border-gray-200" 
              onSubmit={handleSubmit}
            >
              <input 
                type="url" 
                placeholder="Enter website URL to analyze..." 
                className="flex-grow py-3 px-4 focus:outline-none text-gray-700 text-sm border-0"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-4 text-sm transition-colors sm:w-auto w-full"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrlInput;
