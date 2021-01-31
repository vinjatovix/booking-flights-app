import React, { useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Input } from '../common/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { nameProps, mailProps, passwordProps, rePasswordProps, bioProps, buttonProps } from './registerProps';
import PropTypes from 'prop-types';

export const RegisterForm = ({ action, cssClassName, encType, method }) => {
  const [, setAccessToken] = useLocalStorage('', 'auth');
  const [username, serUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bio, setBio] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [, setAuth] = useContext(AuthContext);

  const signIn = async (e) => {
    e.preventDefault();
    const res = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, repeatPassword, bio }),
    });
    const json = await res.json();
    if (res.status !== 201) {
      setErrorMessage(json.details);
      setAuth('');
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      console.log({ email, password, event: e, json });
      setAccessToken(json.token);
      setAuth(json.token);
    }
  };

  return (
    <>
      <form className={cssClassName} encType={encType} method={method} onSubmit={signIn}>
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
  method: PropTypes.string,
};
RegisterForm.defaultProps = {
  encType: 'multipart/form-data',
  cssClassName: 'credentialsForm',
};
