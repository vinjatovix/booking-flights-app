import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { ListDrawer } from './ListDrawer/ListDrawer';

export const Footer = () => {
  const [, setAuth] = useContext(AuthContext);
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
          setAuth('');
        }}
      >
        x
      </div>
    </footer>
  );
};
