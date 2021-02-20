import React from 'react';
import '../profile.css';
import leftArrow from '../../../assets/svg/angle-left-solid.svg';
import { switchBoolean } from '../../../context/auth/Auth.actions';

export const ProfileContainer = ({ props, children }) => {
  return (
    <div className="profile">
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
