import React from 'react';

const CreditDisplay = ({ amount, label = 'Impact Credits', size = 'lg' }) => {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-teal/20 blur-2xl rounded-full" />
        <span className={`${sizes[size]} font-mono font-bold text-white text-glow relative z-10`}>
          {amount}
        </span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.4em] text-teal font-bold">{label}</p>
    </div>
  );
};

export default CreditDisplay;
