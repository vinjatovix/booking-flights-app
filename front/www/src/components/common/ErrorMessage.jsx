import React from 'react';

export const ErrorMessage = ({ children }) => {
  return <div style={{ display: 'block', color: 'red', minHeight: '1.5em' }}> {children}</div>;
};
