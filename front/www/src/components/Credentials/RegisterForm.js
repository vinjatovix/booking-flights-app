import React, { useState } from 'react';
// import { ListDrawer } from '../common/ListDrawer/ListDrawer';

import PropTypes from 'prop-types';
import { Input } from '../common/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';
export const RegisterForm = ({ action, cssClassName, encType, inputs, method }) => {
  const [username, serUserName] = useState('');
  const [email, setEmail] = useState('');
  const [, setAccessToken] = useLocalStorage('', 'auth');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bio, setBio] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const nameProps = {
    type: 'text',
    name: 'username',
    id: 'username',
    placeholder: 'User Name',
    required: 'required',
  };
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
  const rePasswordProps = {
    type: 'password',
    name: 'repeatPassword',
    id: 'repeatPassword',
    placeholder: 'Repeat password',
    required: 'required',
  };
  const bioProps = {
    type: 'text',
    name: 'bio',
    id: 'bio',
    placeholder: 'Bio',
  };
  const buttonProps = {
    id: 'submit-button',
    type: 'submit',
    value: 'Registro',
  };
  const signIn = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8337/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, repeatPassword, bio }),
    });
    const json = await res.json();
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
      <form action={action} className={cssClassName} encType={encType} method={method} onSubmit={signIn}>
        <Input value={username} setValue={serUserName} {...nameProps} />
        <Input value={email} setValue={setEmail} {...mailProps} />
        <Input value={password} setValue={setPassword} {...passwordProps} />
        <Input value={repeatPassword} setValue={setRepeatPassword} {...rePasswordProps} />
        <Input value={bio} setValue={setBio} {...bioProps} />
        <Input {...buttonProps} />
        {/* <ListDrawer type="inputs" items={inputs}></ListDrawer> */}
      </form>
      <div style={{ display: 'block', color: 'red', minHeight: '1.5em' }}> {errorMessage}</div>
    </>
  );
};

RegisterForm.propTypes = {
  action: PropTypes.string,
  cssClassName: PropTypes.string,
  encType: PropTypes.string,
  inputs: PropTypes.array,
  method: PropTypes.string,
};
RegisterForm.defaultProps = {
  encType: 'multipart/form-data',
  cssClassName: 'credentialsForm',
};
