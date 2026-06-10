import React from 'react';
import Modal from './Modal';
import MagneticButton from './MagneticButton';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', type = 'danger' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-muted leading-relaxed">{message}</p>
        <div className="flex gap-4 pt-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-muted hover:text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <MagneticButton 
            onClick={onConfirm}
            className={`flex-1 ${type === 'danger' ? 'bg-danger text-white hover:bg-danger/80' : ''}`}
          >
            {confirmText}
          </MagneticButton>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
