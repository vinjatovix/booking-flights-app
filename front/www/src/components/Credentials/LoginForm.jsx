import React, { useEffect, useState } from 'react';
import './credentials.css';
import PropTypes from 'prop-types';
import { Input } from '../common/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import * as A from '../../context/Auth.actions';

import { mailProps, passwordProps, buttonProps } from './loginProps';

export const LoginForm = ({ action, cssClassName, encType, method, dispatch }) => {
  //TODO: state para el auth, email, etc... probablemente custom hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useLocalStorage('', 'auth');
  console.log(token);
  // const [data, refetch] = useIsLogged(console.log(token));

  const logIn = async (e) => {
    e.preventDefault();

    const res = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    //PONER EL setToken(json.token) aqui y mandar token a la autorizathion
    const authRes = await fetch('http://localhost:8337/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: json.token,
      },
    });

    setToken(json.token);
    const authJSON = await authRes.json();
    console.log(authJSON);

    if (res.status !== 200) {
      dispatch(A.authFailure());
      setErrorMessage(json.details);
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      dispatch(
        A.authSuccess({
          username: authJSON.decodedToken.username,
          mail: authJSON.decodedToken.email,
          id: authJSON.decodedToken.id,
          photo: authJSON.decodedToken.photo,
          bio: authJSON.decodedToken.bio,
          status: authJSON.decodedToken.status,
        })
      );
    }
  };
  return (
    <>
      <form action={action} className={cssClassName} encType={encType} method={method} onSubmit={logIn}>
        <Input value={email} setValue={setEmail} {...mailProps} />
        <Input value={password} setValue={setPassword} {...passwordProps} />
        <Input {...buttonProps} />
      </form>
      <div style={{ display: 'block', color: 'red', minHeight: '1.5em' }}> {errorMessage}</div>
    </>
  );
};

LoginForm.propTypes = {
  action: PropTypes.string,
  cssClassName: PropTypes.string,
  encType: PropTypes.string,
  inputs: PropTypes.array,
  method: PropTypes.string,
};
LoginForm.defaultProps = {
  encType: 'multipart/form-data',
  cssClassName: 'credentialsForm',
};
