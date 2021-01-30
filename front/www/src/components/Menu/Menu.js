import React from 'react';
import './menu.css';
import ProfilePhoto from '../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';

export const Menu = () => {
  return (
    <nav className="menu">
      <section>
        <img src={ProfilePhoto} alt="foto-de-usuario" />
      </section>

      <ul>
        <li className="login">
          <a href="/">Login</a>
        </li>
        <li className="register">
          <a href="/">Register</a>
        </li>
        <li className="about">
          <a href="/">About</a>
        </li>
      </ul>
    </nav>
  );
};
