import React from 'react';

const StepIndicator = ({ currentStep, totalSteps, labels }) => {
  return (
    <div className="flex items-center justify-between mb-12">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm border-2 transition-all duration-500 ${
                  isActive
                    ? 'border-teal bg-teal text-bg shadow-glow'
                    : isCompleted
                    ? 'border-teal bg-teal/20 text-teal'
                    : 'border-white/10 bg-white/5 text-muted'
                }`}
              >
                {isCompleted ? '✓' : step}
              </div>
              <span className={`text-xs uppercase tracking-widest ${isActive ? 'text-teal' : 'text-muted'}`}>
                {labels[i]}
              </span>
            </div>
            {step < totalSteps && (
              <div className={`h-[2px] flex-1 mx-2 transition-all duration-500 ${isCompleted ? 'bg-teal' : 'bg-white/10'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
