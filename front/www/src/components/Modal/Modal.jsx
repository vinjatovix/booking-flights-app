import React from 'react';
import './modal.css';

export const CustomModal = ({ children, title, handleClose }) => {
  return (
    <div className="modal-wrapper" onClick={handleClose}>
      <div className="modal">
        <button onClick={handleClose}>X</button>
        <h1>{title}</h1>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
