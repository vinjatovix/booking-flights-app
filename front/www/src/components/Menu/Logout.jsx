import React from 'react';
import { GoogleLogout } from 'react-google-login';

//TODO temporal id, cambiar y guardar en env
const clientId = '1067297095827-goodtp6cekt9q88favpfjqh3m4jgtipo.apps.googleusercontent.com';

export const Logout = () => {
  const onSuccess = () => {
    // alert('Logout ok');
  };
  return (
    <GoogleLogout
      className="app-menu__list-item"
      clientId={clientId}
      buttonText="See you"
      onLogoutSuccess={onSuccess}
      style={{ border: '2px solid red' }}
    />
  );
};
