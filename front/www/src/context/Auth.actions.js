import * as C from './Auth.constants';


//? CON ESTO ACTUALIZO LOS DATOS DE TXT
//?= lo que llamo desde cmp
//!SIEMPRE SE RECIBE type y pld
export const authSuccess = (payload) => ({
  type: C.AUTH_RESPONSE_SUCCESS,
  payload,
});
export const authFailure = (payload) => ({
  type: C.AUTH_RESPONSE_FAILURE,
  payload,
});
 