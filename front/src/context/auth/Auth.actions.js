import * as C from "./Auth.constants";

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

export const setAvatar = (payload) => ({
  type: C.SET_AVATAR,
  payload,
});
export const setString = (payload) => ({
  type: C.SET_STRING,
  payload,
});

export const closeProfiles = (payload) => ({
  type: C.CLOSE_PROFILES,
  payload,
});
