import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-teal/20 border-t-teal rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
