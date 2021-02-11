import React from 'react';

/* Components & Hooks */
import { FormDrawer } from '../common/FormDrawer';
import {
  mailProps,
  passwordProps,
  buttonProps,
  userNameProps,
  rePasswordProps,
  bioProps,
} from './credentialsFormProps';

/* props and methods */
import { benderSignin } from '../../http/api';

/* Styles */
import './credentials.css';
import { useForm } from '../../hooks/useForm';

/* Component */
export const RegisterForm = (props) => {
  const { dispatch, setToken } = props;
  const [
    /* Hook del formulario */
    { email, password, errorMessage, username, repeatPassword, bio },
    handleInputChange,
    setErrorMessage,
    resetInput,
  ] = useForm({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    errorMessage: '',
    bio: '',
  });
  const items = [
    { ...userNameProps, value: username },
    { ...mailProps, value: email },
    { ...passwordProps, value: password },
    { ...rePasswordProps, value: repeatPassword },
    { ...bioProps, value: bio },
    { ...buttonProps },
  ];

  const req = { username, email, password, repeatPassword, bio };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await benderSignin(req, { setErrorMessage, setToken, dispatch });
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
