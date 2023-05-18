import React, { useState, useRef } from 'react';
import { filesize } from '@/utils';

const Button = ({ text, onClick }) => (
  <button
    type="button"
    className="px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700"
    onClick={onClick}
  >
    {text}
  </button>
);

export default ({ className, name, label, accept, errors = [], onChange }) => {
  const fileInput = useRef();
  const [file, setFile] = useState(null);

  function browse() {
    fileInput.current.click();
  }

  function remove() {
    setFile(null);
    onChange(null);
    fileInput.current.value = null;
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFile(file);
    onChange(file);
  }

  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <div className={`form-input p-0 ${errors.length && 'error'}`}>
        <input
          id={name}
          ref={fileInput}
          accept={accept}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {!file && (
          <></>
        )}
        {file && (
          <div className="">
            <div className="">
              {file.name}
              <span className="ml-1 text-xs text-gray-600">
                ({filesize(file.size)})
              </span>
            </div>
            <Button text="Quitar" onClick={remove} />
          </div>
        )}
      </div>
      {errors.length > 0 && <div className="form-error">{errors}</div>}
    </div>
  );
};
