import React from 'react';
import './modal.css';

export const CustomModal = ({ children, handleClose }) => {
  return (
    <div className="modal-wrapper" onClick={handleClose}>
      <div className="modal">
        <button onClick={handleClose}>X</button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
