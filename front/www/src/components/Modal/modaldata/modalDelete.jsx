import React, { useEffect } from 'react';
import * as A from '../../../context/auth/Auth.actions';
import { useAuthContext } from '../../../context/auth/Auth.context';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { askMeForToken } from '../../../utils/askMeForToken';
import { deleteAccount } from '../../../http/api';

export const DeleteAccount = ({ modal }) => {
  const [, dispatch] = useAuthContext();
  const [token, setToken] = useLocalStorage(JSON.parse(localStorage.getItem('token')), 'token');
  const [{ logged }] = useAuthContext();
  // console.log(logged);

  useEffect(() => {
    if (!logged) {
      setToken('');
      window.location.reload();
    }
    return () => {};
  }, [logged, setToken]);
  return (
    <>
      <div className="modal-container">
        <div className="container-input">
          <h4 className="delete-account">¿Estás seguro de desactivar tu cuenta?</h4>
          <h5 className="delete-account">
            (Si desactivas tu cuenta no podrás volver a logearte y perderás todos tus datos, además de no poder volver a
            registrarte con el email utilizado)
          </h5>
          <button
            className="button-submit delete-account"
            onClick={async (e) => {
              try {
                e.preventDefault();
                await deleteAccount(token, dispatch);
              } catch (err) {
                console.log(err);
                dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
              }
            }}
          >
            Sí
          </button>
          <button
            className="button-close delete-account"
            onClick={() => {
              dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
              console.log('no');
            }}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

