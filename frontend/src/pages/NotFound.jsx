import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import MagneticButton from '../components/ui/MagneticButton';
import PageTransition from '../components/layout/PageTransition';

const NotFound = () => {
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    tl.to('.glitch', { skewX: 20, duration: 0.1 })
      .to('.glitch', { skewX: -20, duration: 0.1 })
      .to('.glitch', { skewX: 0, duration: 0.1 })
      .to('.glitch', { x: 10, duration: 0.1 })
      .to('.glitch', { x: -10, duration: 0.1 })
      .to('.glitch', { x: 0, duration: 0.1 });
  }, []);

  return (
    <PageTransition>
      <div className="h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="glitch text-[15rem] md:text-[20rem] font-heading font-black text-white/5 leading-none absolute">404</h1>
        <div className="relative z-10 space-y-6">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white">Lost in kindness?</h2>
          <p className="text-xl text-muted max-w-md mx-auto">
            The page you're looking for has moved to a better world, or maybe it never existed.
          </p>
          <div className="pt-8">
            <MagneticButton onClick={() => navigate('/')} className="text-xl px-12 py-5">
              Back to Home
            </MagneticButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
