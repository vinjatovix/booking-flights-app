import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import ProfilePhoto from '../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import { authFailure, changeMenu, switchBoolean } from '../../context/Auth.actions';

export const Menu = ({ menu, logged, dispatch, setToken }) => {
  return (
    <nav className="menu">
      <section>
        <img src={ProfilePhoto} alt="foto-de-usuario" />
      </section>

      <ul>
        <Link
          to="/"
          onClick={() => {
            dispatch(changeMenu({ menu }));
          }}
        >
          <li>Buscar</li>
        </Link>

        {!logged && (
          <>
            <Link
              to="/login"
              onClick={() => {
                dispatch(changeMenu({ menu }));
              }}
            >
              <li className="login-button">Login</li>
            </Link>

            <Link
              to="/register"
              onClick={() => {
                dispatch(changeMenu({ menu }));
              }}
            >
              <li className="register-button">Register</li>
            </Link>
          </>
        )}
        {logged && (
          <Link
            to="/profile"
            name="user_profile"
            onClick={({ target }) => {
              dispatch(changeMenu({ menu }));
              dispatch(switchBoolean({ name: target.parentNode.name, value: target.parentNode.value }));
            }}
          >
            <li>Perfil</li>
          </Link>
        )}

        <Link
          to="/about"
          onClick={() => {
            dispatch(changeMenu({ menu }));
          }}
        >
          <li className="about-button">About</li>
        </Link>

        {logged && (
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              setToken('');
              dispatch(authFailure());
            }}
          >
            <li>Logout</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};
