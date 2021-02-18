import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as A from '../../../context/auth/Auth.actions';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export const DeleteAccount = ({ props }) => {
  const { dispatch, modal } = props;
  const token = JSON.parse(localStorage.getItem('token'));
  const [, setToken] = useLocalStorage('', 'token');
  const [redirect, setRedirect] = useState(false);
  console.log(redirect);

  return (
    <>
      <div className="modal-container">
        <div class="container-input">
          <h4 className="delete-account">¿Estás seguro de desactivar tu cuenta?</h4>
          <h5 className="delete-account">
            (Si desactivas tu cuenta no podrás volver a logearte y perderás todos tus datos, además de no poder volver a
            registrarte con el email utilizado)
          </h5>
          <button
            className="button-submit delete-account"
            onClick={async (e) => {
              e.preventDefault();
              const res = await fetch('http://localhost:8337/update/delete', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
              });
              const json = await res.json();
              //   setToken('');
              dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
              setRedirect(true);
              console.log(json);
            }}
          >
            Sí
          </button>
          {redirect === true && <Redirect to="/login" />}
          <button
            className="button-close delete-account"
            onClick={() => {
              dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
            }}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};
