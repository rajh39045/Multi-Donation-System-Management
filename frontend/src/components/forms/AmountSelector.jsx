import React from 'react';

const presetAmounts = [100, 500, 1000, 5000];

const AmountSelector = ({ value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onChange(amount)}
            className={`py-3 rounded-xl border font-mono transition-all ${
              value === amount
                ? 'bg-teal border-teal text-bg shadow-glow'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
          >
            ₹{amount}
          </button>
        ))}
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-mono">₹</span>
        <input
          type="number"
          placeholder="Enter custom amount"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`input-field pl-10 ${error ? 'border-danger/50' : ''}`}
        />
      </div>
      {error && <span className="text-xs text-danger ml-1 font-medium">{error}</span>}
    </div>
  );
};

export default AmountSelector;
