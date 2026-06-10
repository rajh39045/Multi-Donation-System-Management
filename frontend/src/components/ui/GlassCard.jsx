import React from 'react';

const GlassCard = React.forwardRef(({ children, className = '', hover = true, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`glass-card p-6 transition-all duration-300 ${
        hover ? 'hover:scale-[1.02] hover:shadow-glow' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
