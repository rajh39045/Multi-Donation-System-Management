import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GlassCard from './GlassCard';

const StatsCard = ({ label, value, icon: Icon, suffix = '' }) => {
  const countRef = useRef(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: value,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        },
      }
    );
  }, [value]);

  return (
    <GlassCard className="flex items-center space-x-4">
      <div className="p-3 bg-teal/10 rounded-xl text-teal">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-muted text-sm uppercase tracking-wider">{label}</p>
        <h3 className="text-3xl font-mono font-bold text-white">
          <span ref={countRef}>0</span>
          {suffix}
        </h3>
      </div>
    </GlassCard>
  );
};

export default StatsCard;
