import React from 'react';
import Icon from '@/Shared/Icon';
import Button from 'react-bootstrap/Button';

export default ({ onRestore, children }) => {
  return (
    <div className="row">
      <div className="col-md-9">
        <h6>{children}</h6>
      </div>

      <div className="col-md-3 d-flex justify-content-end">
        <Button variant="info" onClick={onRestore} type="button">
          Restaurar
        </Button>
      </div>
    </div>
  );
};
