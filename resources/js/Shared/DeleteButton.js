import React from 'react';
import Button from 'react-bootstrap/Button';

export default ({ onDelete, children }) => (
  <Button variant="danger" onClick={onDelete}>
    {children}
  </Button>
);
