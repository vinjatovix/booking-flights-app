import React from 'react';
import '../profile.css';
import leftArrow from '../../../assets/svg/angle-left-solid.svg';
import { switchBoolean } from '../../../context/Auth.actions';

export const ProfilePass = ({ dispatch, profile_pass }) => {
  return (
    <>
      <section className="profile-data-main">
        <h4>Actualiza tu contraseña</h4>
        <img
          src={leftArrow}
          alt="boton-atras"
          onClick={() => {
            dispatch(switchBoolean({ name: 'profile_pass', value: profile_pass }));
          }}
        />
      </section>
    </>
  );
};
