import React from 'react';

const FormSelect = ({ label, error, register, options, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-muted ml-1">{label}</label>}
      <select
        {...register}
        {...props}
        className={`input-field appearance-none cursor-pointer ${error ? 'border-danger/50 focus:border-danger' : ''}`}
      >
        <option value="" disabled>Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface text-text">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-danger ml-1 font-medium">{error.message}</span>}
    </div>
  );
};

export default FormSelect;
