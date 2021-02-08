import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../common/Input';
import * as A from '../../context/Auth.actions';
import './credentials.css';

import { mailProps, passwordProps, buttonProps } from './credentialsFormProps';
import { useForm } from '../../hooks/useForm';
import { askMeForToken } from '../../utils/askMeForToken';

const formInputs = {
  email: '',
  password: '',
  errorMessage: '',
};

export const LoginForm = ({ action, cssClassName, encType, method, dispatch, setToken, logged, token }) => {
  const [inputs, handleInputChange, setErrorMessage] = useForm(formInputs);
  const { email, password, errorMessage } = inputs;
  useEffect(() => {
    askMeForToken(logged, token, dispatch);
  }, [token, logged, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();

    if (res.status !== 200) {
      dispatch(A.authFailure());
      setErrorMessage(json.details);
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      setToken(json.token);
    }
  };
  return (
    <>
      <form action={action} className={cssClassName} encType={encType} method={method} onSubmit={handleSubmit}>
        <Input value={email} onChange={handleInputChange} {...mailProps} />
        <Input value={password} onChange={handleInputChange} {...passwordProps} />
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
