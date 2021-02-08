import React from 'react';
import './profile.css';
import ProfilePhoto from '../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';

export const Profile = () => {
  return (
    <section className="profile-main">
      <header>
        <img src={ProfilePhoto} alt="foto-de-usuario" />
        <div>
          <h3>Manuel Barca Domingues</h3>
          <p>
            {' '}
            Acercándose o tratore, ajarrou unha machada, e ensima de min: "te quemo y te labro, con la mano y con la
            otra"{' '}
          </p>
        </div>
      </header>
      <main>
        <ul className="categorias">
          <li>
            <a href="/">
              <h4>Cambiar datos de usuario</h4>
              <p>Nickname, foto de perfil, bio</p>
            </a>
          </li>
          <li>
            <a href="/">
              <h4>Cambiar la contraseña</h4>
              <p>Actualízala por una más segura</p>
            </a>
          </li>
          <li>
            <a href="/">
              <h4>Mis reservas</h4>
              <p>Reservas activas y consumidas</p>
            </a>
          </li>
        </ul>
      </main>
    </section>
  );
};
