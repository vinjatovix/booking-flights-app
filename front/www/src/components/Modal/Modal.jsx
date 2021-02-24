import React from 'react';

import './modal.css';

export const CustomModal = ({ children, className = 'modal' }) => {
  return (
    <div className="modal-wrapper">
      <div className={className}>{children}</div>
    </div>
  );
};
