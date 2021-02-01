import * as C from './Auth.constants';

/* UNO DE LOS USOS DEL REDUCER ES UNA ESPECIE DE STATE CON CINTURÓN DE HERRAMIENTAS */
//? SEMILLA DE DATOS DEL CONTEXTO
export const initialState = {
  loading: true,
  logged: false,
  username: null,
  mail: null,
  id: null,
};

/* EL REDUCER CONTIENE LAS LÓGICAS ASOCIADAS A ESE CONTEXTO */
//? este state recibe del context: el tipo es la operación y el payload la fuente de los datos
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
