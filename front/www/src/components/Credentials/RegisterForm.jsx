import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../common/Input';
import * as A from '../../context/Auth.actions';
import './credentials.css';

import { nameProps, mailProps, passwordProps, rePasswordProps, bioProps, buttonProps } from './credentialsFormProps';
import { useForm } from '../../hooks/useForm';
import { askMeForToken } from '../../utils/askMeForToken';

const formInputs = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  bio: '',
  errorMessage: '',
};
export const RegisterForm = ({ action, cssClassName, encType, method, dispatch, setToken, logged, token }) => {
  const [inputs, handleInputChange, setErrorMessage] = useForm(formInputs);

  const { username, email, password, repeatPassword, bio, errorMessage } = inputs;
  useEffect(() => {
    askMeForToken(logged, token, dispatch);
  }, [token, logged, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        setToken(json.token);
      }
    } catch (e) {
      setErrorMessage(e);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <>
      <form className={cssClassName} encType={encType} method={method} onSubmit={handleSubmit}>
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
