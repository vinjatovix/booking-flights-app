import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBackground, ModalContent, ModalClose, Title } from 'bloomer';
import './modal.css';

export const CustomModal = ({ isActive, children, title, handleClose }) => {
  console.log(isActive);
  return (
    <Modal>
      <ModalBackground onClick={handleClose} />
      <ModalContent style={{ backgroundColor: 'white', padding: '2rem', maxWidth: '90vw' }}>
        <Title className="modal-title" isSize={6}>
          {title}
        </Title>
        {children}
      </ModalContent>
      <ModalClose onClick={handleClose} />
    </Modal>
  );
};

CustomModal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
