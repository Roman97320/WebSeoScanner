interface SummaryItem {
  status: 'success' | 'warning' | 'danger';
  text: string;
}

interface ExecutiveSummaryProps {
  summary: SummaryItem[];
}

const ExecutiveSummary = ({ summary }: ExecutiveSummaryProps) => {
  // Map status to icon and styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'success':
        return {
          bg: 'bg-success/10',
          border: 'border-success/20',
          text: 'text-success',
          icon: 'ri-check-line'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          text: 'text-warning',
          icon: 'ri-alert-line'
        };
      case 'danger':
        return {
          bg: 'bg-destructive/10',
          border: 'border-destructive/20',
          text: 'text-destructive',
          icon: 'ri-error-warning-line'
        };
      default:
        return {
          bg: 'bg-gray-100',
          border: 'border-gray-200',
          text: 'text-gray-600',
          icon: 'ri-information-line'
        };
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-6">Executive Summary</h3>
      <div className="card p-6">
        <ul className="space-y-5">
          {summary.map((item, index) => {
            const styles = getStatusStyles(item.status);
            // Split the text to extract the title (before the colon)
            const [title, ...details] = item.text.split(':');
            const detail = details.length > 0 ? details.join(':') : '';
            
            return (
              <li key={index} className={`p-4 rounded-lg ${styles.bg} border ${styles.border} flex items-start`}>
                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white ${styles.text} mr-4 shadow-sm`}>
                  <i className={`${styles.icon} text-lg`}></i>
                </div>
                <div>
                  <span className="font-semibold">{title}</span>
                  {detail && 
                    <>
                      <span className="mx-1">:</span>
                      <span className="text-gray-700">{detail}</span>
                    </>
                  }
                </div>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-500 text-sm flex items-center">
            <i className="ri-lightbulb-line mr-2 text-primary"></i>
            These high-priority items have the largest impact on your SEO performance
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;
