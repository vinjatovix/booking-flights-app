import * as C from "./Auth.constants";

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
  disclaimer: false,
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case C.AUTH_RESPONSE_SUCCESS:
      if (payload.photo === "0") {
        payload.photo = "";
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
      };
    case C.CHANGE_MENU_VISIBILITY:
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
