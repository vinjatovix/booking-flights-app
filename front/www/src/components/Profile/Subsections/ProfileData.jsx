import React from 'react';
import '../profile.css';
import ProfilePhoto from '../../../assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import * as A from '../../../context/auth/Auth.actions';
import edit from '../../../assets/svg/pen-solid.svg';
import { UpdateNickname, UpdateBio, UpdatePhoto } from '../../Modal/modaldata/modalContainerData';

export const ProfileData = ({ profile_data, photo, dispatch, username, bio, email, modal }) => {
  let logo = '';
  if (photo === '') {
    logo = ProfilePhoto;
  } else logo = photo;
  return (
    <>
      <picture>
        <img src={logo} alt="foto-de-usuario" />
        <div
          className="photo-button"
          onClick={() => {
            dispatch(
              A.changeModalData({
                modal_data: <UpdatePhoto props={{ dispatch, modal }} />,
              })
            );
            dispatch(A.switchBoolean({ name: 'modal', value: modal }));
          }}
        ></div>
      </picture>
      <ul className="profile-inputs">
        <li className="profile-nickname">
          <div>
            <h5>Nickname</h5>
            <h4>{username}</h4>
          </div>
          <img
            src={edit}
            alt="boton-de-editar"
            onClick={() => {
              dispatch(
                A.changeModalData({
                  modal_data: <UpdateNickname props={{ dispatch, modal, bio }} />,
                })
              );
              dispatch(A.switchBoolean({ name: 'modal', value: modal }));
            }}
          />
        </li>
        <li className="profile-bio">
          <div>
            <h5>Biografía</h5>
            <h4>{bio}</h4>
          </div>
          <img
            src={edit}
            alt="boton-de-editar"
            onClick={() => {
              dispatch(
                A.changeModalData({
                  modal_data: <UpdateBio props={{ dispatch, modal }} />,
                })
              );
              dispatch(A.switchBoolean({ name: 'modal', value: modal }));
            }}
          />
        </li>
        <li className="profile-email">
          <div>
            <h5>Email</h5>
            <h4>{email}</h4>
          </div>
        </li>
      </ul>
    </>
  );
};
