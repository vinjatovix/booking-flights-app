import React from 'react';
import '../profile.css';
import leftArrow from '../../../assets/svg/angle-left-solid.svg';
import { switchBoolean } from '../../../context/Auth.actions';

export const ProfilePass = ({ dispatch, profile_pass }) => {
  return (
    <>
      <section className="profile-pass-main">
        <h4>Actualiza tu contraseña</h4>
        <img
          src={leftArrow}
          alt="boton-atras"
          onClick={() => {
            dispatch(switchBoolean({ name: 'profile_pass', value: profile_pass }));
          }}
        />
        <form>
          <label for="profile-password">Contraseña actual</label>
          <input type="text" id="profile-password" autofocus></input>
          <label for="profile-new-pass">Contraseña nueva </label>
          <input type="text" id="profile-new-pass" placeholder="Al menos 8 caracteres"></input>
          <label for="profile-rep-new-pass">Confirma la contraseña</label>
          <input type="text" id="profile-rep-new-pass" placeholder="Al menos 8 caracteres"></input>
        </form>
      </section>
    </>
  );
};
