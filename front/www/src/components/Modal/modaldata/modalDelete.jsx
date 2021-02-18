import React from 'react';
import * as A from '../../../context/auth/Auth.actions';

export const DeleteAccount = ({ props }) => {
  const { dispatch, modal } = props;
  return (
    <>
      <button
        className="button-close"
        onClick={() => {
          dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
        }}
      >
        Cerrar
      </button>
    </>
  );
};
