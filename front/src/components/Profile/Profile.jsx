import React, { useEffect, useState } from "react";

import { DeleteAccount } from "../Modal/modaldata/modalDelete";

import { useAuthContext } from "../../context/auth/Auth.context";
import * as A from "../../context/auth/Auth.actions";

import "./profile.css";
export const Profile = ({
  photo,
  username,
  bio,
  dispatch,
  profile_data,
  profile_pass,
  profile_bookings,
  modal,
}) => {
  const [css, setCss] = useState("profile radius focus");

  const [{ menu }] = useAuthContext();
  useEffect(() => {
    menu ? setCss("profile  blur") : setCss("profile  focus");
  }, [menu]);

  return (
    <section className={css}>
      <header className="profile-header">
        <img src={photo} alt="foto-usuario" />
        <div className="profile-header__info">
          <h3>{username}</h3>
          <h5>{bio}</h5>
        </div>
      </header>
      <main className="profile-main">
        <ul className="profile-main__list">
          <li
            className="profile-main__list-data"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                A.switchBoolean({ name: "profile_data", value: profile_data })
              );
            }}
          >
            <h4>Cambiar datos de usuario</h4>
            <p>Nickname, foto de perfil, bio</p>
          </li>
          <li
            className="profile-main__list-pass"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                A.switchBoolean({ name: "profile_pass", value: profile_pass })
              );
            }}
          >
            <h4>Cambiar la contraseña</h4>
            <p>Actualízala por una más segura</p>
          </li>
          <li
            className="profile-main__list-bookings"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                A.switchBoolean({
                  name: "profile_bookings",
                  value: profile_bookings,
                })
              );
            }}
          >
            <h4>Mis reservas</h4>
            <p>Historial de reservas</p>
          </li>
          <li className="profile-main__list-tools">
            <h4>Ajustes</h4>
            <p>Modifica tus preferencias</p>
          </li>
          <li
            className="profile-main__list-delete"
            onClick={() => {
              dispatch(
                A.changeModalData({
                  modal_data: <DeleteAccount props={{ dispatch, modal }} />,
                })
              );
              dispatch(A.switchBoolean({ name: "modal", value: modal }));
            }}
          >
            <h4>Desactivar cuenta</h4>
            <p>No recibir más notificaciones</p>
          </li>
        </ul>
      </main>
    </section>
  );
};
