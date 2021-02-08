import React from 'react';
import './menu.css';
import ProfilePhoto from '../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';

export const Menu = ({ logged }) => {
  return (
    <nav className="menu">
      <section>
        <img src={ProfilePhoto} alt="foto-de-usuario" />
      </section>

      <ul>
        {!logged && (
          <>
            <li className="login-button">
              <a href="/login">Login</a>
            </li>
            <li className="register-button">
              <a href="/register">Register</a>
            </li>
          </>
        )}
        <li className="about-button">
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
};
