import React, { useState } from 'react';
import './credentials.css';
import PropTypes from 'prop-types';
import { Input } from '../common/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useIsLogged } from '../../hooks/useIsLogged';
import * as A from '../../context/Auth.actions';

import { mailProps, passwordProps, buttonProps } from './loginProps';

export const LoginForm = ({ action, cssClassName, encType, method, dispatch }) => {
  //TODO: state para el auth, email, etc... probablemente custom hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useLocalStorage('', 'auth');
  const [data, refetch] = useIsLogged(token);

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

    setToken(json.token);
    console.log(data);

    if (res.status !== 200) {
      dispatch(A.authFailure());
      setErrorMessage(json.details);
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      dispatch(
        A.authSuccess({
          username: data.decodedToken.username,
          mail: data.decodedToken.email,
          id: data.decodedToken.id,
          photo: data.decodedToken.photo,
          bio: data.decodedToken.bio,
          status: data.decodedToken.status,
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
