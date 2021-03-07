import React from "react";

import { FormDrawer } from "./FormDrawer";
import { useForm } from "../../hooks/useForm";

import {
  bioProps,
  initialRegFormState,
  mailProps,
  passwordProps,
  rePasswordProps,
  userNameProps,
} from "./credentialsFormProps";
import { benderSignin } from "../../http/api";

import "./credentials.css";

export const RegisterForm = (props) => {
  const { dispatch, setToken } = props;
  const [
    { email, password, errorMessage, username, repeatPassword, bio },
    handleInputChange,
    setErrorMessage,
    resetInput,
  ] = useForm(initialRegFormState);

  const req = { username, email, password, repeatPassword, bio };
  const items = [
    { ...userNameProps, value: username },
    { ...mailProps, value: email },
    { ...passwordProps, value: password },
    { ...rePasswordProps, value: repeatPassword },
    { ...bioProps, value: bio },
  ];

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
      setErrorMessage={setErrorMessage}
      setToken={setToken}
      dispatch={dispatch}
    />
  );
};
