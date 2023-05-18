import React from 'react';

export default ({ label, name, className, errors = [], ...props }) => {
  return (
    <div>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className={className}>
        <input
          id={name}
          name={name}
          {...props}
          className={`form-input form-control ${errors.length ? 'error' : ''}`}
        />
      </div>
      {errors && <div className="text-danger text-xs mt-2">{errors}</div>}
    </div>
  );
};
