import React from "react";

import {
  UpdateNickname,
  UpdateBio,
  UpdatePhoto,
} from "../../Modal/modaldata/modalContainerData";
import ProfilePhoto from "../../../assets/svg/imagen-de-usuario-con-fondo-negro.svg";

import * as A from "../../../context/auth/Auth.actions";

import "../profile.css";

export const ProfileData = ({
  photo,
  dispatch,
  username,
  bio,
  email,
  modal,
  token,
  setToken,
}) => {
  const logo = photo === "" ? ProfilePhoto : photo;

  return (
    <>
      <div className="profile-data__photo">
        <img src={logo} alt="foto-de-usuario" />
        <div
          className="profile-data__photo-edit"
          onClick={() => {
            dispatch(
              A.changeModalData({
                modal_data: (
                  <UpdatePhoto
                    props={{ dispatch, modal }}
                    photo={logo}
                    token={token}
                    setToken={setToken}
                  />
                ),
              })
            );
            dispatch(A.switchBoolean({ name: "modal", value: modal }));
          }}
        ></div>
      </div>
      <ul className="profile-data__inputs">
        <li className="profile-data__inputs-nick">
          <div>
            <h5>Nickname</h5>
            <h4>{username}</h4>
          </div>
          <div
            className="edit-button"
            onClick={() => {
              dispatch(
                A.changeModalData({
                  modal_data: (
                    <UpdateNickname props={{ dispatch, modal, bio }} />
                  ),
                })
              );
              dispatch(A.switchBoolean({ name: "modal", value: modal }));
            }}
          />
        </li>
        <li className="profile-data__inputs-bio">
          <div>
            <h5>Biografía</h5>
            <h4>{bio}</h4>
          </div>
          <div
            className="edit-button"
            onClick={() => {
              dispatch(
                A.changeModalData({
                  modal_data: (
                    <UpdateBio props={{ dispatch, modal, username }} />
                  ),
                })
              );
              dispatch(A.switchBoolean({ name: "modal", value: modal }));
            }}
          />
        </li>
        <li className="profile-data__inputs-email">
          <div>
            <h5>Email</h5>
            <h4>{email}</h4>
          </div>
        </li>
      </ul>
    </>
  );
};
