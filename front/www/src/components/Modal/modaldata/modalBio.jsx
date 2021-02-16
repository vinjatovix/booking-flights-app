import React from 'react';
import * as A from '../../../context/Auth.actions';

export const UpdateBio = ({ props }) => {
  const { dispatch, modal } = props;
  return (
    <>
      <form>
        <label for="update-bio">Escribe tu nueva bio</label>
        <input type="text" name="update-bio" id="update-bio" />
      </form>
      <div className="button-container">
        <button className="button-submit">Actualizar</button>
        <button
          className="button-close"
          onClick={() => {
            dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
          }}
        >
          Cerrar
        </button>
      </div>
    </>
  );
};
