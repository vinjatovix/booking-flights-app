import React from 'react';
import * as A from '../../context/Auth.actions';
import { ListDrawer } from './ListDrawer/ListDrawer';

export const Footer = ({ dispatch, setToken }) => {
  return (
    <footer className="app-footer">
      Code-Vix &copy; 2021 FLanders v0.6
      <ListDrawer
        type="links"
        items={[
          { children: 'login', url: '/login' },
          { children: 'register', url: '/register' },
          { children: 'about', url: '/about' },
          { children: 'search', url: '/' },
        ]}
      />
      <div
        onClick={(e) => {
          e.preventDefault();
          setToken('');
          dispatch(A.authFailure());
        }}
      >
        x
      </div>
    </footer>
  );
};
