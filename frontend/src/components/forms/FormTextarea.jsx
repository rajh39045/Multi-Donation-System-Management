import React from 'react';

const FormTextarea = ({ label, error, register, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-muted ml-1">{label}</label>}
      <textarea
        {...register}
        {...props}
        className={`input-field min-h-[120px] resize-none ${error ? 'border-danger/50 focus:border-danger' : ''}`}
      />
      {error && <span className="text-xs text-danger ml-1 font-medium">{error.message}</span>}
    </div>
  );
};

export default FormTextarea;
