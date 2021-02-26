import React, { useState } from 'react';
import * as A from '../../../context/auth/Auth.actions';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { ErrorMessage } from '../../../components/common/ErrorMessage';

export const UpdateNickname = ({ props }) => {
  const { dispatch, modal, bio } = props;
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [, setDatos] = useLocalStorage('', 'token');

  const token = JSON.parse(localStorage.getItem('token'));
  const body = { username: value, bio: bio };

  return (
    <>
      <div className="modal-container">
        <form>
          <label for="update-nickname">Escribe tu nuevo nickname</label>
          <input
            type="text"
            name="update-nickname"
            id="update-nickname"
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
                dispatch(A.setString({ name: 'username', value: value }));
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

// <div className="modal-container">
//   <form>
//     <label for="update-nickname">Escribe tu nuevo nickname</label>
//     <input
//       type="text"
//       name="update-nickname"
//       id="update-nickname"
//       value={value}
//       onChange={({ target }) => {
//         setValue(target.value);
//       }}
//     />
//     {emptyString === true && <h4 className="update-error">El nickname no puede estar vacío</h4>}
//   </form>
//   <div className="button-container">
//     <button
//
//       className="button-submit"
//       onClick={async (e) => {
//         e.preventDefault();
//         if (value === '') {
//           setEmptyString(true);
//         } else {
//           const res = await fetch('http://localhost:8337/update/data', {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: token,
//             },
//             body: JSON.stringify(body),
//           });
//           const json = await res.json();
//           dispatch(A.setString({ name: 'username', value: value }));
//           setDatos(json.newToken);
//           dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
//         }
//       }}
//     >
//       Actualizar
//     </button>
//     <button
//       className="button-close"
//       onClick={() => {
//         dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
//       }}
//     >
//       Cerrar
//     </button>
//   </div>
// </div>;
