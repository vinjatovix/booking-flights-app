import React from 'react';
import { Menu } from '../Menu/Menu';

export const Main = (props) => {
  const { className, children, menu } = props;
  return (
    <main className={className}>
      {menu ? <Menu className="app-menu" {...props} /> : null}

      {children}
    </main>
  );
};
