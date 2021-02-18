import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { googleLogin } from '../../http/api';

const clientId = '1067297095827-goodtp6cekt9q88favpfjqh3m4jgtipo.apps.googleusercontent.com';

export const GoogleButton = ({ setErrorMessage, setToken, dispatch }) => {
  const onSuccess = async (res) => {
    await googleLogin(res.tokenId, { setErrorMessage, setToken, dispatch });
  };

  const onFailure = (res) => {
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Google Access"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
};
