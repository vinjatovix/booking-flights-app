import React from 'react';
import '../profile.css';
import leftArrow from '../../../assets/svg/angle-left-solid.svg';
import { switchBoolean } from '../../../context/Auth.actions';

export const ProfileContainer = ({ props, children }) => {
  return (
    <div className="profile-main">
      <section>
        <img
          src={leftArrow}
          alt="boton-atras"
          onClick={() => {
            props[1](switchBoolean({ name: Object.keys(props[0])[0], value: Object.values(props[0])[0] }));
          }}
        />
      </section>
      {children}
    </div>
  );
};

// <img src={logo} alt="foto-de-usuario" />;
//<div className="photo-button"></div>;
