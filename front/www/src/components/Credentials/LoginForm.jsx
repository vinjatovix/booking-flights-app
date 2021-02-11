import React from 'react';

/* Components & Hooks */
import { useForm } from '../../hooks/useForm';

/* props and methods */
import { mailProps, passwordProps, buttonProps } from './credentialsFormProps';
import { benderLogin } from '../../http/api';

/* Styles */
import './credentials.css';
import { FormDrawer } from '../common/FormDrawer';

/* Component */
export const LoginForm = (props) => {
  const { setToken, dispatch } = props;
  const [{ email, password, errorMessage }, handleInputChange, setErrorMessage, resetInput] = useForm({
    email: '',
    password: '',
    errorMessage: '',
  });

  const items = [
    { ...mailProps, value: email },
    {
      ...passwordProps,
      value: password,
    },
    { ...buttonProps },
  ];
  const req = { email, password };
  const actions = { setErrorMessage, setToken, dispatch };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await benderLogin(req, actions);
  };
  return (
    <FormDrawer
      items={items}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      reset={resetInput}
      errorMessage={errorMessage}
    />
  );
};
