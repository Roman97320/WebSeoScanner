export interface SeoElement {
  id: string;
  name: string;
  weight: number;
  score: number;
  status: 'success' | 'warning' | 'danger' | 'loading';
  currentValue?: string;
  recommendation?: string;
  details?: string;
}

export interface AnalysisResult {
  id: string;
  url: string;
  timestamp: number;
  favicon?: string;
  overallScore: number;
  passedCount: number;
  warningCount: number;
  criticalCount: number;
  executiveSummary: {
    status: 'success' | 'warning' | 'danger';
    text: string;
  }[];
  seoElements: SeoElement[];
  serp: {
    title: string;
    url: string;
    description: string;
  };
  social: {
    title: string;
    description: string;
    imageUrl?: string;
  };
  html?: string;
}

export interface SeoElementDefinition {
  id: string;
  name: string;
  weight: number;
  check: (html: string, url: string) => Promise<{
    score: number;
    status: 'success' | 'warning' | 'danger';
    currentValue?: string;
    recommendation?: string;
    details?: string;
  }>;
}
