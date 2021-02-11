import React from 'react';
import '../profile.css';
import ProfilePhoto from '../../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import leftArrow from '../../../assets/svg/angle-left-solid.svg';
import { switchBoolean } from '../../../context/Auth.actions';

export const ProfileData = ({ profile_data, photo, dispatch }) => {
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
      </section>
    </>
  );
};
