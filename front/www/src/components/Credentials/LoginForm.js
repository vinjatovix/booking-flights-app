import React, { useState } from 'react';
import { ListDrawer } from '../common/ListDrawer/ListDrawer';
import './credentials.css';
import PropTypes from 'prop-types';
import { Input } from '../common/Input';

export const LoginForm = ({ action, cssClassName, encType, inputs, method }) => {
  //TODO: state para el auth, email, etc... probablemente custom hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  const logIn = (e) => {
    e.preventDefault();
    console.log(e); //TODO: gestionar submit
  };
  return (
    <form action={action} className={cssClassName} encType={encType} method={method} onSubmit={logIn}>
      <Input value={email} setValue={setEmail} {...mailProps} />
      <Input value={password} setValue={setPassword} {...passwordProps} />
      <Input {...buttonProps} />

    </form>
  );
};

LoginForm.propTypes = {
  action: PropTypes.string.isRequired,
  cssClassName: PropTypes.string,
  encType: PropTypes.string,
  inputs: PropTypes.array.isRequired,
  method: PropTypes.string.isRequired,
};
LoginForm.defaultProps = {
  encType: 'multipart/form-data',
  cssClassName: 'credentialsForm',
};
