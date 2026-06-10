import React from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        '.modal-content',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
      gsap.fromTo(
        '.modal-backdrop',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        className="modal-backdrop absolute inset-0 bg-bg/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="modal-content relative w-full max-w-lg bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal via-gold to-primary" />
        <h3 className="text-2xl mb-6 font-heading">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;
