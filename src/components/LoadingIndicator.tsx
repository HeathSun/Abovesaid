import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Analyzing text importance...' 
}) => {
  return (
    <div className="abovesaid-loading">
      <div className="abovesaid-loading-spinner"></div>
      <span>{message}</span>
    </div>
  );
};

