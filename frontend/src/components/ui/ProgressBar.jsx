import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ProgressBar = ({ progress, label }) => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 1.5,
      ease: 'power3.out',
    });
  }, [progress]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-muted">{label}</span>
          <span className="text-sm font-mono text-teal">{progress}%</span>
        </div>
      )}
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-primary to-teal rounded-full shadow-glow"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
