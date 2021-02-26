import React, { useEffect, useState } from 'react';
import './profile.css';
import * as A from '../../context/auth/Auth.actions';
import { DeleteAccount } from '../Modal/modaldata/modalDelete';
import { switchBoolean } from '../../context/auth/Auth.actions';
import { useAuthContext } from '../../context/auth/Auth.context';

export const Profile = ({ photo, username, bio, dispatch, profile_data, profile_pass, profile_bookings, modal }) => {
  const [css, setCss] = useState('profile radius focus');

  const [{ menu }] = useAuthContext();
  useEffect(() => {
    menu ? setCss('profile  blur') : setCss('profile  focus');
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
              dispatch(switchBoolean({ name: 'profile_data', value: profile_data }));
            }}
          >
            <h4>Cambiar datos de usuario</h4>
            <p>Nickname, foto de perfil, bio</p>
          </li>
          <li
            className="profile-main__list-pass"
            onClick={(e) => {
              e.preventDefault();
              dispatch(switchBoolean({ name: 'profile_pass', value: profile_pass }));
            }}
          >
            <h4>Cambiar la contraseña</h4>
            <p>Actualízala por una más segura</p>
          </li>
          <li
            className="profile-main__list-bookings"
            onClick={(e) => {
              e.preventDefault();
              dispatch(switchBoolean({ name: 'profile_bookings', value: profile_bookings }));
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
              dispatch(A.switchBoolean({ name: 'modal', value: modal }));
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

//  <section className="profile-main">
//       <header>
//         <img src={photo} alt="foto-de-usuario" />
//         <div>
//           <h3>{username}</h3>
//           <p>{bio}</p>
//         </div>
//       </header>
// {
//   /* TODO: Lograr hacer los dispatch en cada LINK  */
// }
// {
//   /* <main>
//         <ul className="categorias">
//           <div
//             onClick={(e) => {
//               e.preventDefault();
//               dispatch(switchBoolean({ name: 'profile_data', value: profile_data }));
//             }}
//           >
//             <li className="profile-data">
//               <h4>Cambiar datos de usuario</h4>
//               <p>Nickname, foto de perfil, bio</p>
//             </li>
//           </div>
//           <div
//             onClick={(e) => {
//               e.preventDefault();
//               dispatch(switchBoolean({ name: 'profile_pass', value: profile_pass }));
//             }}
//           >
//             <li className="profile-pass">
//               <h4>Cambiar la contraseña</h4>
//               <p>Actualízala por una más segura</p>
//             </li>
//           </div>
//           <div
//             onClick={(e) => {
//               e.preventDefault();
//               dispatch(switchBoolean({ name: 'profile_bookings', value: profile_bookings }));
//             }}
//           >
//             <li className="profile-booking">
//               <h4>Mis reservas</h4>
//               <p>Historial de reservas</p>
//             </li>
//           </div>

//           <div to="/profile">
//             <li className="profile-tools">
//               <h4>Ajustes</h4>
//               <p>Modifica tus preferencias</p>
//             </li>
//           </div>
//           <div
//             onClick={() => {
//               dispatch(
//                 A.changeModalData({
//                   modal_data: <DeleteAccount props={{ dispatch, modal }} />,
//                 })
//               );
//               dispatch(A.switchBoolean({ name: 'modal', value: modal }));
//             }}
//           >
//             <li className="profile-off">
//               <h4>Desactivar cuenta</h4>
//               <p>No recibir más notificaciones</p>
//             </li>
//           </div>
//         </ul>
//       </main>
//     </section> */
// }
