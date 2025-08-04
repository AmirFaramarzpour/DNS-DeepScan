import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-gray-700 border-t-blue-500 rounded-full animate-spin`}></div>
        <div className={`${sizeClasses[size]} border-gray-800 border-t-purple-500 rounded-full animate-spin absolute top-0 left-0`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      {text && (
        <p className={`text-gray-400 ${textSizeClasses[size]} font-medium animate-pulse`}>{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;