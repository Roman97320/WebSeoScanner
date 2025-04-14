import { useState } from "react";
import { AnalysisResult } from "@/types";
import ScoreChart from "./ScoreChart";
import ExecutiveSummary from "./ExecutiveSummary";
import SeoElementItem from "./SeoElementItem";
import PreviewCards from "./PreviewCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* URL Banner */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Analysis Results for:</h2>
              <div className="mt-2 flex items-center">
                {result.favicon && (
                  <img src={result.favicon} alt="Website favicon" className="h-6 w-6 mr-2" />
                )}
                <span className="text-primary-600 font-medium text-lg">{result.url}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <Button 
                variant="outline" 
                className="text-gray-600"
                onClick={() => {
                  // In a real app, this would generate a PDF report
                  alert("PDF export functionality would be implemented here");
                }}
              >
                <i className="ri-file-download-line mr-1"></i> Export PDF
              </Button>
              <Button onClick={handleReanalyze}>
                <i className="ri-refresh-line mr-1"></i> Reanalyze
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Score Card */}
        <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Overall SEO Performance</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Score Visualization */}
              <div className="w-48 h-48 mb-6 lg:mb-0 relative">
                <ScoreChart score={result.overallScore} />
              </div>
              
              {/* Score Summary */}
              <div className="flex-grow lg:ml-8 max-w-2xl">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  {result.overallScore >= 80 ? "Excellent!" : 
                   result.overallScore >= 60 ? "Good, but room for improvement" :
                   result.overallScore >= 40 ? "Needs improvement" : 
                   "Critical issues detected"}
                </h4>
                <p className="text-gray-600 mb-4">
                  {result.overallScore >= 80 ? 
                    "Your website demonstrates strong SEO fundamentals across most key areas. Keep up the good work!" : 
                    result.overallScore >= 60 ? 
                    "Your website has strong SEO fundamentals, but there are several opportunities to improve your search visibility and user experience." :
                    result.overallScore >= 40 ? 
                    "Your website has significant SEO issues that are likely impacting your search performance and user experience." :
                    "Your website has critical SEO problems that require immediate attention to improve search visibility."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-success-500 text-lg font-semibold">{result.passedCount} Passed</div>
                    <div className="text-sm text-gray-500">Checks</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-warning-500 text-lg font-semibold">{result.warningCount} Warnings</div>
                    <div className="text-sm text-gray-500">To improve</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-danger-500 text-lg font-semibold">{result.criticalCount} Critical</div>
                    <div className="text-sm text-gray-500">Issues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Report Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Tabs defaultValue="summary">
            <div className="bg-gray-50 px-2 pt-2 border-b border-gray-200">
              <TabsList className="grid grid-cols-4 md:w-auto md:inline-flex h-auto bg-transparent gap-1">
                <TabsTrigger 
                  value="summary" 
                  className="py-3 px-4 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent flex items-center"
                >
                  <i className="ri-dashboard-line mr-2"></i>
                  Summary
                </TabsTrigger>
                <TabsTrigger 
                  value="seo" 
                  className="py-3 px-4 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent flex items-center"
                >
                  <i className="ri-search-line mr-2"></i>
                  SEO Factors
                </TabsTrigger>
                <TabsTrigger 
                  value="technical" 
                  className="py-3 px-4 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent flex items-center"
                >
                  <i className="ri-code-s-slash-line mr-2"></i>
                  Technical
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="py-3 px-4 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent flex items-center"
                >
                  <i className="ri-eye-line mr-2"></i>
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="summary" className="p-6">
              {/* Executive Summary */}
              <ExecutiveSummary summary={result.executiveSummary} />
              
              {/* SEO Elements Scores (Top Issues) */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key SEO Elements</h3>
                <div className="overflow-hidden">
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
                  <div className="text-center mt-6">
                    <Button 
                      variant="ghost"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                      onClick={() => setShowAllElements(true)}
                    >
                      <span>View All {result.seoElements.length} SEO Elements</span>
                      <i className="ri-arrow-down-s-line ml-1"></i>
                    </Button>
                  </div>
                )}
              </div>
              
              {/* SERP Preview */}
              <PreviewCards serp={result.serp} social={result.social} />
            </TabsContent>
            
            <TabsContent value="seo" className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">On-Page SEO Factors</h3>
                <div className="overflow-hidden">
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
            </TabsContent>
            
            <TabsContent value="technical" className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical SEO Factors</h3>
                <div className="overflow-hidden">
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
            </TabsContent>
            
            <TabsContent value="preview" className="p-6">
              <PreviewCards serp={result.serp} social={result.social} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AnalysisReport;
