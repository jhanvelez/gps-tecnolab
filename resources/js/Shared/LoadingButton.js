import React from 'react';
import cx from 'classnames';
import Button from 'react-bootstrap/Button';

export default ({ loading, className, children, ...props }) => {
  const classNames = cx(
    'flex items-center',
    'focus: outline-none',
    {
      'pointer-events-none bg-opacity-75 select-none': loading
    },
    className
  );
  return (
    <Button
      disabled={loading}
      className={classNames}
      {...props}
      variant="success"
    >
      {loading && <div className="mr-2 btn-spinner" />}
      {children}
    </Button>
  );
};
