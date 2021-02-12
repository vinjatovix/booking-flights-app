import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePhoto from '../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import { authFailure, changeMenu, switchBoolean } from '../../context/Auth.actions';

import './menu.css';

export const Menu = ({ menu, logged, dispatch, setToken }) => {
  return (
    <nav className="menu radius">
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
          <li className="radius">Buscar</li>
        </Link>

        {!logged && (
          <>
            <Link
              to="/login"
              onClick={() => {
                dispatch(changeMenu({ menu }));
              }}
            >
              <li className="login-button radius">Login</li>
            </Link>

            <Link
              to="/register"
              onClick={() => {
                dispatch(changeMenu({ menu }));
              }}
            >
              <li className="register-button radius">Register</li>
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
            <li className="radius">Perfil</li>
          </Link>
        )}

        <Link
          to="/about"
          onClick={() => {
            dispatch(changeMenu({ menu }));
          }}
        >
          <li className="about-button radius">About</li>
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
            <li className="radius">Logout</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};
