import { useMemo, useEffect, useState } from 'react';

interface ScoreChartProps {
  score: number;
}

const ScoreChart = ({ score }: ScoreChartProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Calculate the stroke-dashoffset
  // The circle circumference is 2 * PI * r = 2 * 3.14159 * 45 ≈ 282.74
  // The offset is calculated as circumference * (1 - score / 100)
  const circumference = 2 * Math.PI * 42;
  
  const offset = useMemo(() => {
    return circumference * (1 - animatedScore / 100);
  }, [animatedScore, circumference]);

  // Animation effect for the score
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [score]);

  // Determine text and stroke color based on score
  const colorData = useMemo(() => {
    if (score >= 80) {
      return {
        textColor: 'text-success',
        gradientColors: ['#10b981', '#059669'],
        statusText: 'Excellent'
      };
    }
    if (score >= 60) {
      return {
        textColor: 'text-warning',
        gradientColors: ['#f59e0b', '#d97706'],
        statusText: 'Good'
      };
    }
    if (score >= 40) {
      return {
        textColor: 'text-orange-500',
        gradientColors: ['#f97316', '#ea580c'],
        statusText: 'Fair'
      };
    }
    return {
      textColor: 'text-destructive',
      gradientColors: ['#ef4444', '#dc2626'],
      statusText: 'Poor'
    };
  }, [score]);

  const { textColor, gradientColors, statusText } = colorData;
  
  const gradientId = `scoreGradient-${score.toString().replace('.', '-')}`;

  return (
    <div className="relative w-full h-full">
      <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="42" 
          fill="none" 
          stroke="#f1f1f1" 
          strokeWidth="8"
          opacity="0.3" 
        />
        
        {/* Score Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="42" 
          fill="none" 
          stroke={`url(#${gradientId})`}
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeDasharray={circumference} 
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000 ease-out"
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientColors[0]} />
            <stop offset="100%" stopColor={gradientColors[1]} />
          </linearGradient>
        </defs>
        
        {/* Decorative dots on the circle */}
        {[0, 25, 50, 75].map(point => {
          const angle = (point / 100) * 360 - 90;
          const x = 50 + 42 * Math.cos((angle * Math.PI) / 180);
          const y = 50 + 42 * Math.sin((angle * Math.PI) / 180);
          return (
            <circle
              key={point}
              cx={x}
              cy={y}
              r="2"
              fill="#fff"
              stroke={point <= score ? gradientColors[0] : '#ccc'}
              strokeWidth="1"
            />
          );
        })}
      </svg>
      
      {/* Score Text (Centered) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${textColor} transition-colors duration-500`}>
          {Math.round(animatedScore)}
        </span>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500">out of 100</span>
          <span className={`text-sm font-medium mt-1 ${textColor}`}>{statusText}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;
