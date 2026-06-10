import React from 'react';

const DatePicker = ({ label, error, register, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-muted ml-1">{label}</label>}
      <input
        type="date"
        {...register}
        {...props}
        className={`input-field dark:[color-scheme:dark] ${error ? 'border-danger/50 focus:border-danger' : ''}`}
      />
      {error && <span className="text-xs text-danger ml-1 font-medium">{error.message}</span>}
    </div>
  );
};

export default DatePicker;
