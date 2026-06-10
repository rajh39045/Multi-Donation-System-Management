import React from 'react';
import { useToastStore } from '../../hooks/useToast';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  const toastRef = useGSAP(() => {
    const targets = gsap.utils.toArray('.toast-item');
    if (targets.length > 0) {
      gsap.fromTo(
        targets,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [toasts]);

  return (
    <div ref={toastRef} className="fixed top-24 right-6 z-[9999] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-item flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl min-w-[300px] ${
            toast.type === 'success'
              ? 'bg-teal/20 border-teal/40 text-teal'
              : toast.type === 'error'
              ? 'bg-danger/20 border-danger/40 text-danger'
              : 'bg-gold/20 border-gold/40 text-gold'
          }`}
        >
          {toast.type === 'success' && <CheckCircle size={20} />}
          {toast.type === 'error' && <AlertCircle size={20} />}
          {toast.type === 'info' && <Info size={20} />}
          <span className="flex-1 font-medium">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="hover:rotate-90 transition-transform">
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
