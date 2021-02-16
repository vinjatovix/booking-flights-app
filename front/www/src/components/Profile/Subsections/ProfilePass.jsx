import React from 'react';
import '../profile.css';

export const ProfilePass = ({ dispatch, profile_pass }) => {
  return (
    <>
      <h4>Actualiza tu contraseña</h4>
      <form className="change-pass-form">
        <label for="profile-password">Contraseña actual</label>
        <input type="text" id="profile-password" autofocus></input>
        <label for="profile-new-pass">Contraseña nueva </label>
        <input type="text" id="profile-new-pass" placeholder="Al menos 8 caracteres"></input>
        <label for="profile-rep-new-pass">Confirma la contraseña</label>
        <input type="text" id="profile-rep-new-pass" placeholder="Al menos 8 caracteres"></input>
        <button className="button-edit-pass" type="submit">
          Guardar
        </button>
      </form>
    </>
  );
};
