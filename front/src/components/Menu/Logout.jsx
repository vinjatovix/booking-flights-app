import React from 'react';
import { GoogleLogout } from 'react-google-login';

//TODO temporal id, cambiar y guardar en env
const clientId = '1067297095827-goodtp6cekt9q88favpfjqh3m4jgtipo.apps.googleusercontent.com';

export const Logout = () => {
  return <GoogleLogout clientId={clientId} buttonText="Logout" />;
};
