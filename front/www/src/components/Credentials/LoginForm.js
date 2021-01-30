import React, { useState } from 'react';
import { ListDrawer } from '../common/ListDrawer/ListDrawer';
import './credentials.css';
import PropTypes from 'prop-types';
import { Input } from '../common/Input';

export const LoginForm = ({ action, cssClassName, encType, inputs, method }) => {
  //TODO: state para el auth, email, etc... probablemente custom hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const mailProps = {
    type: 'email',
    name: 'userMail',
    id: 'userMail',
    placeholder: 'Em@il',
    required: 'required',
  };
  const passwordProps = {
    type: 'password',
    name: 'password',
    id: 'password',
    placeholder: 'password',
    required: 'required',
  };
  const buttonProps = {
    id: 'submit-button',
    type: 'submit',
    value: 'Login',
  };
  const logIn = async (e) => {
    e.preventDefault();
    console.log(e); //TODO: gestionar submit
    const res = await fetch('http://localhost:8337/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    console.log(json);
    console.log(json.details[0].message);
    if (res.status === 418) {
      setErrorMessage('Algo va mal con el formulario');
    }
    if (res.status === 400) {
      if (json?.details[0]?.message) {
        setErrorMessage(json.details[0].message);
      } else {
        setErrorMessage(json.details);
      }
      // setAuth("");
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      console.log({ email, password, event: e, json });
      // setAccessToken(json.accessToken);
      // setAuth(json.accessToken);
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
