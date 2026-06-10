import React from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const SectionReveal = ({ children, className = '' }) => {
  const sectionRef = useGSAP(() => {
    const targets = gsap.utils.toArray('.reveal-item');
    if (targets.length > 0) {
      gsap.fromTo(
        targets,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: targets[0],
            start: 'top 85%',
          },
        }
      );
    }
  }, [children]);

  return (
    <div ref={sectionRef} className={className}>
      {React.Children.map(children, (child) => (
        <div className="reveal-item">{child}</div>
      ))}
    </div>
  );
};

export default SectionReveal;
