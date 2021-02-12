import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePhoto from '../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import { authFailure, changeMenu, switchBoolean } from '../../context/Auth.actions';

import './menu.css';

export const Menu = ({ menu, logged, dispatch, setToken }) => {
  return (
    <nav className="app-menu radius">
      <header className="app-menu__header">
        <img src={ProfilePhoto} alt="foto de usuario" />
      </header>

      <ul className="app-menu__list">
        <Link
          to="/"
          onClick={() => {
            dispatch(changeMenu({ menu }));
          }}
        >
          <li className="app-menu__list-item search-button radius">Buscar</li>
        </Link>

        {!logged && (
          <>
            <Link
              to="/login"
              onClick={() => {
                dispatch(changeMenu({ menu }));
              }}
            >
              <li className=" app-menu__list-item login-button radius">Login</li>
            </Link>

            <Link
              to="/register"
              onClick={() => {
                dispatch(changeMenu({ menu }));
              }}
            >
              <li className="app-menu__list-item register-button radius">Register</li>
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
            <li className="app-menu__list-item profile-button radius">Perfil</li>
          </Link>
        )}

        <Link
          to="/about"
          onClick={() => {
            dispatch(changeMenu({ menu }));
          }}
        >
          <li className="app-menu__list-item about-button radius">About</li>
        </Link>

        {logged && (
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              setToken('');
              dispatch(authFailure());
              dispatch(changeMenu({ menu }));
            }}
          >
            <li className="app-menu__list-item logout-button radius">Logout</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};
