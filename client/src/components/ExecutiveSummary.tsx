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
          bg: 'bg-success-100',
          text: 'text-success-600',
          icon: 'ri-check-line'
        };
      case 'warning':
        return {
          bg: 'bg-warning-100',
          text: 'text-warning-600',
          icon: 'ri-error-warning-line'
        };
      case 'danger':
        return {
          bg: 'bg-danger-100',
          text: 'text-danger-600',
          icon: 'ri-alert-line'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          icon: 'ri-information-line'
        };
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Executive Summary</h3>
      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <ul className="space-y-3">
          {summary.map((item, index) => {
            const styles = getStatusStyles(item.status);
            // Split the text to extract the title (before the colon)
            const [title, ...details] = item.text.split(':');
            
            return (
              <li key={index} className="flex items-start">
                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full ${styles.bg} ${styles.text} mr-3`}>
                  <i className={styles.icon}></i>
                </span>
                <div>
                  <span className="font-medium text-gray-800">{title}</span>
                  {details.length > 0 && `:${details.join(':')}`}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExecutiveSummary;
