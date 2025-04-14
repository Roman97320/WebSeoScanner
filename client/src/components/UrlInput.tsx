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
    <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Analyze Your Website's SEO & Code
          </h1>
          <p className="mt-3 text-xl text-primary-100">
            Get a comprehensive SEO audit report with actionable insights
          </p>
        </div>
        
        <div className="mt-8 max-w-3xl mx-auto">
          <form className="flex flex-col sm:flex-row shadow-xl rounded-lg overflow-hidden" onSubmit={handleSubmit}>
            <input 
              type="url" 
              placeholder="Enter website URL (e.g., https://example.com)" 
              className="flex-grow py-4 px-4 focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-700"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-6 transition-colors duration-150 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
              ) : (
                <i className="ri-search-line mr-2"></i>
              )}
              {isLoading ? "Analyzing..." : "Analyze"}
            </button>
          </form>
          <p className="mt-3 text-sm text-primary-100 text-center">
            We'll fetch the underlying HTML and analyze key SEO and technical elements
          </p>
        </div>
      </div>
    </section>
  );
};

export default UrlInput;
