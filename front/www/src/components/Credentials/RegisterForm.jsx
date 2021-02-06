import React, { useEffect, useState } from 'react';
import { Input } from '../common/Input';
import * as A from '../../context/Auth.actions';

import { nameProps, mailProps, passwordProps, rePasswordProps, bioProps, buttonProps } from './registerProps';
import PropTypes from 'prop-types';

export const RegisterForm = ({ action, cssClassName, encType, method, dispatch }) => {
  const [inputs, setInputs] = useState({
    username: '',
    userMail: '',
    password: '',
    repeatPassword: '',
    bio: '',
    errorMessage: '',
  });
  const { username, email, password, repeatPassword, bio, errorMessage } = inputs;

  useEffect(() => {
    // console.log('al montarse');
    return () => {};
  }, []);
  useEffect(() => {
    // console.log('al cambiar');
    return () => {};
  }, [inputs]);

  const handleInputChange = ({ target }) => {
    setInputs({
      ...inputs,
      [target.name]: target.value,
    });
  };
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
      // setErrorMessage(json.details);
      // setTimeout(() => setErrorMessage(''), 3000);
    } else {
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
        <Input value={username} onChange={handleInputChange} {...nameProps} />
        <Input value={email} onChange={handleInputChange} {...mailProps} />
        <Input value={password} onChange={handleInputChange} {...passwordProps} />
        <Input value={repeatPassword} onChange={handleInputChange} {...rePasswordProps} />
        <Input value={bio} onChange={handleInputChange} {...bioProps} />
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
