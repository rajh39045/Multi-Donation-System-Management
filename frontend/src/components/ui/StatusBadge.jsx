import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-gold/10 text-gold border-gold/20',
    assigned: 'bg-teal/10 text-teal border-teal/20',
    picked_up: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    delivered: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    completed: 'bg-green-500/10 text-green-400 border-green-500/20',
    available: 'bg-teal/10 text-teal border-teal/20',
    claimed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-mono uppercase border ${
        styles[status] || 'bg-muted/10 text-muted border-muted/20'
      }`}
    >
      {status.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge;
