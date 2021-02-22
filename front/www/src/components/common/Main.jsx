import React from 'react';
import { useAuthContext } from '../../context/auth/Auth.context';
import { Menu } from '../Menu/Menu';
import { CustomModal } from '../Modal/Modal';

export const Main = (props) => {
  const [{ menu, modal, modal_data }] = useAuthContext();
  return (
    <main className="app-main">
      {menu ? <Menu className="app-menu" {...props} /> : null}
      {modal && <CustomModal children={modal_data} />}
      {props.children}
    </main>
  );
};
