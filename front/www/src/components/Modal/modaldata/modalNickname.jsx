import React from 'react';
import * as A from '../../../context/auth/Auth.actions';

export const UpdateNickname = ({ props }) => {
  const { dispatch, modal } = props;
  return (
    <>
      <div className="modal-container">
        <form>
          <label for="update-nickname">Escribe tu nuevo nickname</label>
          <input type="text" name="update-nickname" id="update-nickname" />
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
      </div>
    </>
  );
};
