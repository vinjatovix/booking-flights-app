import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import ProfilePhoto from '../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import { authFailure } from '../../context/Auth.actions';

export const Menu = ({ logged, setToken, dispatch }) => {
  return (
    <nav className="menu">
      <section>
        <img src={ProfilePhoto} alt="foto-de-usuario" />
      </section>

      <ul>
        <li>
          <Link to="/">Buscar</Link>
        </li>
        {!logged && (
          <>
            <li className="login-button">
              <Link to="/login">Login</Link>
            </li>
            <li className="register-button">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {logged && (
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
        )}
        <li className="about-button">
          <Link to="/about">About</Link>
        </li>
        {logged && (
          <li>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                setToken('');
                dispatch(authFailure());
              }}
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
