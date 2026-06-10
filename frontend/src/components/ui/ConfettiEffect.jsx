import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ConfettiEffect = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ['#0a6e4f', '#f5a623', '#00d4aa', '#ef4444', '#f0f4f8'];
    const particles = 50;

    for (let i = 0; i < particles; i++) {
      const p = document.createElement('div');
      p.className = 'absolute w-3 h-3 rounded-sm opacity-0';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(p);

      gsap.set(p, {
        x: '50%',
        y: '50%',
        rotation: Math.random() * 360,
      });

      gsap.to(p, {
        opacity: 1,
        x: `${Math.random() * 200 - 100}vw`,
        y: `${Math.random() * 200 - 100}vh`,
        rotation: Math.random() * 720,
        duration: 1.5 + Math.random(),
        ease: 'power2.out',
        onComplete: () => p.remove(),
      });
    }
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden" />;
};

export default ConfettiEffect;
