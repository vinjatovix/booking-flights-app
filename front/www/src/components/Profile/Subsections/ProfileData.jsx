import React from 'react';
import '../profile.css';
import ProfilePhoto from '../../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import * as A from '../../../context/Auth.actions';
import edit from '../../../assets/svg/pen-solid.svg';
import { CustomModal } from '../../Modal/Modal';

export const ProfileData = ({ profile_data, photo, dispatch, username, bio, email }) => {
  let logo = '';
  if (photo === '') {
    logo = ProfilePhoto;
  } else logo = photo;
  return (
    <>
      <picture>
        <img src={logo} alt="foto-de-usuario" />
        <div className="photo-button"></div>
      </picture>
      <ul className="profile-inputs">
        <li className="profile-nickname">
          <div>
            <h5>Nickname</h5>
            <h4>{username}</h4>
          </div>
          <img src={edit} alt="boton-de-editar" />
        </li>
        <li className="profile-bio">
          <div>
            <h5>Biografía</h5>
            <h4>{bio}</h4>
          </div>
          <img src={edit} alt="boton-de-editar" />
        </li>
        <li className="profile-email">
          <div>
            <h5>Email</h5>
            <h4>{email}</h4>
          </div>
        </li>
      </ul>
    </>
  );
};
