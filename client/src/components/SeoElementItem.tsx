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
      bg: 'bg-success-100',
      text: 'text-success-600',
      icon: 'ri-check-line'
    },
    warning: {
      bg: 'bg-warning-100',
      text: 'text-warning-600',
      icon: 'ri-error-warning-line'
    },
    danger: {
      bg: 'bg-danger-100',
      text: 'text-danger-600',
      icon: 'ri-alert-line'
    },
    loading: {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      icon: 'ri-loader-4-line animate-spin'
    }
  };

  const currentStyle = statusStyles[element.status];
  
  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden transition-shadow hover:shadow-md">
      <div 
        className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <div className="flex flex-1 items-center">
          <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full ${currentStyle.bg} ${currentStyle.text} mr-3`}>
            <i className={currentStyle.icon}></i>
          </span>
          <div className="flex-1">
            <span className="font-medium text-gray-800">{element.name}</span>
            <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Weight: {element.weight}/10</span>
          </div>
        </div>
        <div className="ml-4 flex items-center">
          <div className="w-12 text-center mr-4">
            <span className={cn({
              'text-success-600': element.score >= 80,
              'text-warning-600': element.score >= 40 && element.score < 80,
              'text-danger-600': element.score < 40
            }, 'font-bold')}>{element.score}</span>
            <span className="text-xs text-gray-500 block">/100</span>
          </div>
          <button className="text-gray-400">
            <i className={`${isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-xl`}></i>
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {element.details && (
            <div className="mb-3">
              <h4 className="font-medium text-sm text-gray-700 mb-2">
                {element.status === 'success' ? 'Success' : element.status === 'warning' ? 'Warning' : 'Issue Detected'}
              </h4>
              <p className="text-gray-600">{element.details}</p>
            </div>
          )}
          
          {element.currentValue && (
            <div className="mb-3">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Current Value</h4>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm text-gray-700 overflow-x-auto">
                <code>{element.currentValue}</code>
              </div>
            </div>
          )}
          
          {element.recommendation && (
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Recommendation</h4>
              <p className="text-gray-600">{element.recommendation}</p>
              {element.status === 'danger' && (
                <div className="mt-2 bg-success-50 p-3 rounded font-mono text-sm text-gray-700 overflow-x-auto">
                  <code>{/* Example of good implementation would go here */}</code>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeoElementItem;
