import React, { useState } from 'react';
import '../profile.css';

export const ProfilePass = ({ dispatch, profile_pass }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [repNewPass, setRepNewPass] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [changedPass, setChangedPass] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'));
  const body = { password: oldPass, newPassword: newPass, repeatNewPassword: repNewPass };

  return (
    <>
      <h4>Actualiza tu contraseña</h4>
      <form className="change-pass-form">
        <label for="profile-password">Contraseña actual</label>
        <input
          type="password"
          id="profile-password"
          value={oldPass}
          onChange={({ target }) => {
            setOldPass(target.value);
          }}
          autofocus
        ></input>
        <label for="profile-new-pass">Contraseña nueva </label>
        <input
          type="password"
          id="profile-new-pass"
          placeholder="Al menos 8 caracteres"
          value={newPass}
          onChange={({ target }) => {
            setNewPass(target.value);
          }}
        ></input>
        <label for="profile-rep-new-pass">Confirma la contraseña</label>
        <input
          type="password"
          id="profile-rep-new-pass"
          placeholder="Al menos 8 caracteres"
          value={repNewPass}
          onChange={({ target }) => {
            setRepNewPass(target.value);
          }}
        ></input>
        {emptyString === true && <h4 className="update-error">Los campos no pueden estar vacíos</h4>}
        {changedPass === true && <h4 className="update-success">Contraseña actualizada</h4>}
        <button
          className="button-edit-pass"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            if (oldPass === '' || newPass === '' || repNewPass === '') {
              setEmptyString(true);
            } else {
              setEmptyString(false);
              const res = await fetch('http://localhost:8337/update/pass', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
                body: JSON.stringify(body),
              });
              const json = await res.json();
              if (json.code === 401) {
              } else {
                setChangedPass(true);
              }

              console.log(json);
            }
          }}
        >
          Guardar
        </button>
      </form>
    </>
  );
};
