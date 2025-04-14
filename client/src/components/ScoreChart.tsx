import { useMemo } from 'react';

interface ScoreChartProps {
  score: number;
}

const ScoreChart = ({ score }: ScoreChartProps) => {
  // Calculate the stroke-dashoffset
  // The circle circumference is 2 * PI * r = 2 * 3.14159 * 45 ≈ 282.74
  // The offset is calculated as circumference * (1 - score / 100)
  const offset = useMemo(() => {
    const circumference = 2 * Math.PI * 45;
    return circumference * (1 - score / 100);
  }, [score]);

  // Determine text color based on score
  const textColor = useMemo(() => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-500';
    return 'text-danger-600';
  }, [score]);

  return (
    <div className="relative w-full h-full">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f1f1" strokeWidth="10" />
        
        {/* Score Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="url(#scoreGradient)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeDasharray="282.74" 
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)" 
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Score Text (Centered) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${textColor}`}>
          {Math.round(score)}
        </span>
        <span className="text-sm text-gray-500 mt-1">out of 100</span>
      </div>
    </div>
  );
};

export default ScoreChart;
