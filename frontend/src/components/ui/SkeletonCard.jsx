import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="w-12 h-12 bg-white/10 rounded-xl mb-4" />
      <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
    </div>
  );
};

export default SkeletonCard;
