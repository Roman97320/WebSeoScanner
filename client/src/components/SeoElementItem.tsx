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
      icon: 'ri-check-line'
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      text: 'text-warning',
      icon: 'ri-alert-line'
    },
    danger: {
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      text: 'text-destructive',
      icon: 'ri-error-warning-line'
    },
    loading: {
      bg: 'bg-gray-100',
      border: 'border-gray-200',
      text: 'text-gray-600',
      icon: 'ri-loader-4-line animate-spin'
    }
  };

  const currentStyle = statusStyles[element.status];
  
  const scoreColorClass = cn({
    'text-success': element.score >= 80,
    'text-warning': element.score >= 40 && element.score < 80,
    'text-destructive': element.score < 40
  });
  
  return (
    <div className="card shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden">
      <div 
        className="flex items-center p-5 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex flex-1 items-center">
          <span className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full ${currentStyle.bg} ${currentStyle.text} mr-4 border ${currentStyle.border}`}>
            <i className={`${currentStyle.icon} text-lg`}></i>
          </span>
          <div className="flex-1">
            <span className="font-semibold text-foreground">{element.name}</span>
            <div className="mt-1 flex items-center">
              <span className="text-xs bg-background text-gray-500 px-2 py-0.5 rounded-full border border-border">
                Weight: {element.weight}/10
              </span>
              <div className="hidden sm:block ml-3 text-xs text-gray-500 line-clamp-1">
                {element.status === 'success' ? 'Properly optimized' : 
                 element.status === 'warning' ? 'Could be improved' : 
                 'Needs attention'}
              </div>
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center">
          <div className="w-16 text-center mr-4 bg-background rounded-full py-1 px-2 border border-border">
            <span className={`${scoreColorClass} font-bold text-lg`}>{element.score}</span>
            <span className="text-xs text-gray-500 ml-0.5">/100</span>
          </div>
          <button className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
            <i className="ri-arrow-down-s-line text-2xl text-gray-400"></i>
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-border p-5 bg-background/50">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {element.details && (
                <div className="mb-6">
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full ${currentStyle.bg} mr-2`}></span>
                    <span className="uppercase tracking-wider text-xs">
                      {element.status === 'success' ? 'Success' : element.status === 'warning' ? 'Warning' : 'Issue Detected'}
                    </span>
                  </h4>
                  <p className="text-gray-600">{element.details}</p>
                </div>
              )}
              
              {element.recommendation && (
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <i className="ri-lightbulb-line text-primary mr-2"></i>
                    <span className="uppercase tracking-wider text-xs">Recommendation</span>
                  </h4>
                  <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                    <p className="text-gray-700">{element.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
            
            {element.currentValue && (
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center">
                  <i className="ri-code-line text-gray-500 mr-2"></i>
                  <span className="uppercase tracking-wider text-xs">Current Implementation</span>
                </h4>
                <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto max-h-40">
                  <code>{element.currentValue}</code>
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
