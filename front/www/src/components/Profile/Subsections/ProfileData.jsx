import React from 'react';
import '../profile.css';
import ProfilePhoto from '../../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import leftArrow from '../../../assets/svg/angle-left-solid.svg';
import edit from '../../../assets/svg/pen-solid.svg';
import { switchBoolean } from '../../../context/Auth.actions';

export const ProfileData = ({ profile_data, photo, dispatch, username, bio, email }) => {
  console.log(profile_data);
  console.log(photo);

  let logo = '';
  if (photo === '') {
    logo = ProfilePhoto;
  } else logo = photo;
  return (
    <>
      <section className="profile-data-main">
        <img
          src={leftArrow}
          alt="boton-atras"
          onClick={() => {
            dispatch(switchBoolean({ name: 'profile_data', value: profile_data }));
          }}
        />
        <img src={logo} alt="foto-de-usuario" />
        <div className="photo-button"></div>
      </section>
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
