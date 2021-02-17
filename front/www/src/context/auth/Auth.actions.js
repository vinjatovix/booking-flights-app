import * as C from './Auth.constants';

/* 
? Estas son las acciones disponibles en el dispatch. 
? reciben el payload y aplican su caso del reducer.
*/
//!SIEMPRE SE RECIBE type y pld
export const authSuccess = (payload) => ({
  type: C.AUTH_RESPONSE_SUCCESS,
  payload,
});

export const authFailure = (payload) => ({
  type: C.AUTH_RESPONSE_FAILURE,
  payload,
});

export const changeMenu = (payload) => ({
  type: C.CHANGE_MENU_VISIBILITY,
  payload,
});

export const switchBoolean = (payload) => ({
  type: C.SWITCH_BOOLEAN,
  payload,
});

export const changeModalData = (payload) => ({
  type: C.CHANGE_MODAL_DATA,
  payload,
});
