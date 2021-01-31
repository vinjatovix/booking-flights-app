import * as C from './Auth.constants';

//? SEMILLA DE DATOS DEL CTXT
export const initialState = {
  logged: false,
  username: null,
  mail: null,
  id: null,
  loading: true,
};

//? este state recibe del context
export const reducer = (state, { type, payload }) => {
  switch (type) {
    case C.AUTH_RESPONSE_SUCCESS:
      //? lógica
      return {
        ...state,
        loading: false,
        logged: true,
        username: payload.username,
        mail: payload.email,
        id: payload.id,
      };
    case C.AUTH_RESPONSE_FAILURE:
      //? lógica
      return {
        ...state,
        loading: false,
        logged: false,
        username: null,
        mail: null,
        id: null,
      };

    default:
      return state;
  }
};
