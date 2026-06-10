import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, className = '', onClick, type = 'button', disabled = false }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || window.innerWidth < 1024) return;

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-8 py-3 bg-gold text-bg font-bold rounded-full overflow-hidden transition-colors hover:bg-teal disabled:opacity-50 disabled:cursor-not-allowed btn-magnetic ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default MagneticButton;
