import React from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const containerRef = useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.to('.curtain', {
      xPercent: 100,
      duration: 0.8,
      ease: 'power4.inOut',
    })
    .fromTo('.page-content', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <div className="curtain fixed inset-0 bg-primary z-[999] pointer-events-none" />
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
