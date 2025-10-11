import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="abovesaid-loading">
      <div className="abovesaid-loading-spinner"></div>
      <span>Analyzing text importance...</span>
    </div>
  );
};

