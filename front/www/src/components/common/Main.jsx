import React from 'react';
import { Menu } from '../Menu/Menu';
import { CustomModal } from '../Modal/Modal';

export const Main = (props) => {
  const { className, children, menu, modal, modal_data } = props;
  return (
    <main className={className}>
      {menu ? <Menu className="app-menu" {...props} /> : null}
      {modal && <CustomModal>{modal_data}</CustomModal>}

      {children}
    </main>
  );
};
