import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import ProfilePhoto from '../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import { switchBoolean } from '../../context/Auth.actions';

export const Profile = ({ photo, username, bio, dispatch }) => {
  let logo = '';
  if (photo === '') {
    logo = ProfilePhoto;
  } else logo = photo;

  return (
    <section className="profile-main">
      <header>
        <img src={logo} alt="foto-de-usuario" />
        <div>
          <h3>{username}</h3>
          <p>{bio}</p>
        </div>
      </header>
      {/* TODO: Lograr hacer los dispatch en cada LINK  */}
      <main>
        <ul className="categorias">
          <Link
            to="/profile"
            name="profile_data"
            onClick={(e) => {
              console.log(e);
            }}
          >
            <li className="profile-data">
              <h4>Cambiar datos de usuario</h4>
              <p>Nickname, foto de perfil, bio</p>
            </li>
          </Link>
          <Link to="/profile">
            <li className="profile-pass">
              <h4>Cambiar la contraseña</h4>
              <p>Actualízala por una más segura</p>
            </li>
          </Link>
          <Link to="/profile">
            <li className="profile-booking">
              <h4>Mis reservas</h4>
              <p>Historial de reservas</p>
            </li>
          </Link>
          <Link to="/profile">
            <li className="profile-tools">
              <h4>Ajustes</h4>
              <p>Modifica tus preferencias</p>
            </li>
          </Link>
          <Link to="/profile">
            <li className="profile-off">
              <h4>Desactivar cuenta</h4>
              <p>No recibir más notificaciones</p>
            </li>
          </Link>
        </ul>
      </main>
    </section>
  );
};
