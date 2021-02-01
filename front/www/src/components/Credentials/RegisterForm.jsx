import React, { useState } from 'react';
import { Input } from '../common/Input';
import * as A from '../../context/Auth.actions';

import { nameProps, mailProps, passwordProps, rePasswordProps, bioProps, buttonProps } from './registerProps';
import PropTypes from 'prop-types';

export const RegisterForm = ({ action, cssClassName, encType, method, dispatch }) => {
  const [username, serUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bio, setBio] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    const res = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, repeatPassword, bio }),
    });
    const json = await res.json();
    if (res.status !== 201) {
      dispatch(A.authFailure());
      setErrorMessage(json.details);
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      console.log({ email, password, event: e, json });
      dispatch(
        A.authSuccess({
          username,
          email,
          id: json.id,
        })
      );
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
        <input {...buttonProps} style={{ cursor: 'pointer' }} />
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
