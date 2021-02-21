import * as C from './Auth.constants';

/* UNO DE LOS USOS DEL REDUCER ES UNA ESPECIE DE STATE CON CINTURÓN DE HERRAMIENTAS */
//? SEMILLA DE DATOS DEL CONTEXTO
export const initialState = {
  loading: false,
  logged: false,
  username: null,
  email: null,
  id: null,
  photo: null,
  bio: null,
  status: null,
  menu: false,
  profile_data: false,
  profile_pass: false,
  profile_bookings: false,
  profile_tools: false,
  modal: false,
  modal_data: null,
  google: false,
};

/* EL REDUCER CONTIENE LAS LÓGICAS ASOCIADAS A ESE CONTEXTO */
//? este state recibe del context: el tipo es la operación y el payload la fuente de los datos
export const reducer = (state, { type, payload }) => {
  switch (type) {
    case C.AUTH_RESPONSE_SUCCESS:
      if (payload.photo === '0') {
        payload.photo = '';
      }

      return {
        ...state,
        loading: false,
        logged: true,
        username: payload.username,
        email: payload.email,
        id: payload.id,
        photo: payload.photo,
        bio: payload.bio,
        status: payload.status,
      };
    case C.AUTH_RESPONSE_FAILURE:
      //? lógica
      return {
        ...state,
        email: null,
        username: null,
        id: null,
        photo: null,
        bio: null,
        status: null,
        logged: false,
        loading: false,
        // modal: false,
      };
    case C.CHANGE_MENU_VISIBILITY:
      //? lógica
      return {
        ...state,
        menu: !payload.menu,
      };
    case C.SWITCH_BOOLEAN:
      return {
        ...state,
        [`${payload.name}`]: !payload.value,
      };
    case C.CHANGE_MODAL_DATA:
      return {
        ...state,
        modal_data: payload.modal_data,
      };
    case C.SET_AVATAR:
      return {
        ...state,
        photo: payload,
      };

    case C.SET_STRING:
      return {
        ...state,
        [`${payload.name}`]: `${payload.value}`,
      };

    case C.CLOSE_PROFILES:
      return {
        ...state,
        profile_data: false,
        profile_pass: false,
        profile_bookings: false,
        profile_tools: false,
      };

    default:
      return state;
  }
};
