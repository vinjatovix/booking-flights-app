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
