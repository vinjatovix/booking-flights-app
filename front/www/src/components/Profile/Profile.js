import React from 'react';
import './profile.css';
import ProfilePhoto from '../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';

export const Profile = ({ username, bio, photo }) => {
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
      <main>
        <ul className="categorias">
          <li className="profile-data">
            <a href="/profile">
              <h4>Cambiar datos de usuario</h4>
              <p>Nickname, foto de perfil, bio</p>
            </a>
          </li>
          <li className="profile-pass">
            <a href="/profile">
              <h4>Cambiar la contraseña</h4>
              <p>Actualízala por una más segura</p>
            </a>
          </li>
          <li className="profile-booking">
            <a href="/profile">
              <h4>Mis reservas</h4>
              <p>Historial de reservas</p>
            </a>
          </li>
          <li className="profile-tools">
            <a href="/profile">
              <h4>Ajustes</h4>
              <p>Modifica tus preferencias</p>
            </a>
          </li>
          <li className="profile-off">
            <a href="/profile">
              <h4>Desactivar cuenta</h4>
              <p>No recibir más notificaciones</p>
            </a>
          </li>
        </ul>
      </main>
    </section>
  );
};
