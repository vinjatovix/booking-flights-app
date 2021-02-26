import React, { useState } from 'react';
import * as A from '../../../context/auth/Auth.actions';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { ErrorMessage } from '../../../components/common/ErrorMessage';

export const UpdateBio = ({ props }) => {
  const { dispatch, modal, username } = props;
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [, setDatos] = useLocalStorage('', 'token');

  const token = JSON.parse(localStorage.getItem('token'));
  const body = { username: username, bio: value };
  return (
    <>
      <div className="modal-container">
        <form>
          <label for="update-bio">Escribe tu nueva bio</label>
          <input
            type="text"
            name="update-bio"
            id="update-bio"
            value={value}
            onChange={({ target }) => {
              setValue(target.value);
            }}
          />
        </form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <div className="button-container">
          <button
            type="submit"
            className="modal-button submit-button"
            onClick={async (e) => {
              e.preventDefault();
              const res = await fetch('http://localhost:8337/update/data', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
                body: JSON.stringify(body),
              });
              const json = await res.json();
              if (json.ok === false) {
                setErrorMessage(json.details);
                setTimeout(() => {
                  setErrorMessage(false);
                }, 5000);
              } else {
                dispatch(A.setString({ name: 'bio', value: value }));
                setDatos(json.newToken);
                dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
              }
            }}
          >
            Actualizar
          </button>
          <button
            className="modal-button close-button"
            onClick={() => {
              dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};
