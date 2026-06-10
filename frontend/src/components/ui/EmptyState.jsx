import React from 'react';
import MagneticButton from './MagneticButton';

const EmptyState = ({ message, cta, onCtaClick, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-muted">
        {Icon ? <Icon size={48} /> : <div className="text-6xl">📦</div>}
      </div>
      <h3 className="text-xl text-white mb-2">{message}</h3>
      {cta && (
        <MagneticButton onClick={onCtaClick} className="mt-4">
          {cta}
        </MagneticButton>
      )}
    </div>
  );
};

export default EmptyState;
