import { useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import AnalysisReport from "@/components/AnalysisReport";
import { AnalysisResult } from "@/types";

const Report = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const { data: report, isLoading, error } = useQuery<AnalysisResult>({
    queryKey: [`/api/analysis/${id}`],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error Loading Report",
        description: error instanceof Error ? error.message : "Failed to load the analysis report",
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  if (isLoading || !report) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
        <h2 className="mt-4 text-xl font-semibold">Loading Analysis Report...</h2>
        <p className="mt-2 text-gray-600">We're retrieving your SEO analysis results.</p>
      </div>
    );
  }
  
  return <AnalysisReport result={report} isLoading={isLoading} />;
};

export default Report;
