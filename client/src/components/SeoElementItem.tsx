import { SeoElement } from '@/types';
import { cn } from '@/lib/utils';

interface SeoElementItemProps {
  element: SeoElement;
  isExpanded: boolean;
  onToggle: () => void;
}

const SeoElementItem = ({ element, isExpanded, onToggle }: SeoElementItemProps) => {
  // Determine status-related styles
  const statusStyles = {
    success: {
      bg: 'bg-success/10',
      border: 'border-success/20',
      text: 'text-success',
      icon: 'ri-check-line',
      title: 'SUCCESS'
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      text: 'text-warning',
      icon: 'ri-alert-line',
      title: 'WARNING'
    },
    danger: {
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      text: 'text-destructive',
      icon: 'ri-error-warning-line',
      title: 'ISSUE DETECTED'
    },
    loading: {
      bg: 'bg-gray-100',
      border: 'border-gray-200',
      text: 'text-gray-600',
      icon: 'ri-loader-4-line animate-spin',
      title: 'LOADING'
    }
  };

  const currentStyle = statusStyles[element.status];
  
  const scoreColorClass = cn({
    'text-success': element.score >= 80,
    'text-warning': element.score >= 40 && element.score < 80,
    'text-destructive': element.score < 40
  });
  
  return (
    <div className={`card shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border ${
      element.status === 'success' ? 'border-success/10' : 
      element.status === 'warning' ? 'border-warning/10' : 
      element.status === 'danger' ? 'border-destructive/10' : 'border-gray-200'
    }`}>
      <div 
        className="flex items-center p-5 cursor-pointer group"
        onClick={onToggle}
      >
        <div className="flex flex-1 items-center">
          <span className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full ${currentStyle.bg} ${currentStyle.text} mr-4 border ${currentStyle.border} shadow-sm group-hover:scale-110 transition-transform duration-200`}>
            <i className={`${currentStyle.icon} text-lg`}></i>
          </span>
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-foreground block truncate">{element.name}</span>
            <div className="mt-1.5 flex items-center flex-wrap gap-2">
              <span className="text-xs bg-background text-gray-500 px-2 py-0.5 rounded-full border border-border/70 whitespace-nowrap">
                Weight: {element.weight}/10
              </span>
              <div className="text-xs text-gray-500 line-clamp-1">
                {element.status === 'success' ? 'Properly optimized' : 
                 element.status === 'warning' ? 'Could be improved' : 
                 'Needs attention'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex items-center gap-3">
          <div className="text-center px-3 py-1.5 rounded-full bg-background border border-border flex items-center group-hover:border-gray-300 transition-colors">
            <span className={`${scoreColorClass} font-bold text-lg`}>{element.score}</span>
            <span className="text-xs text-gray-500 ml-0.5">/100</span>
          </div>
          <button aria-label="Toggle details" className={`transition-transform duration-200 h-8 w-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
            <i className="ri-arrow-down-s-line text-xl"></i>
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-border px-5 py-6 bg-background/50">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {element.details && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3 flex items-center">
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${currentStyle.bg} ${currentStyle.text} mr-2`}>
                      <i className={`${currentStyle.icon} text-xs`}></i>
                    </span>
                    <span className="uppercase tracking-wider text-xs font-bold">
                      {currentStyle.title}
                    </span>
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{element.details}</p>
                </div>
              )}
              
              {element.recommendation && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary mr-2">
                      <i className="ri-lightbulb-line text-xs"></i>
                    </span>
                    <span className="uppercase tracking-wider text-xs font-bold">Recommendation</span>
                  </h4>
                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 shadow-sm">
                    <p className="text-gray-700 leading-relaxed">{element.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
            
            {element.currentValue && (
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-500 mr-2">
                    <i className="ri-code-line text-xs"></i>
                  </span>
                  <span className="uppercase tracking-wider text-xs font-bold">Current Implementation</span>
                </h4>
                <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto max-h-40 shadow-sm">
                  <pre><code>{element.currentValue}</code></pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeoElementItem;
