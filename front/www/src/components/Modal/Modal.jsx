import React from 'react';
import './modal.css';

export const CustomModal = ({ children }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">{children}</div>
    </div>
  );
};
