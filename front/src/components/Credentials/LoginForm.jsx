import React from "react";

import { FormDrawer } from "./FormDrawer";

import { benderLogin } from "../../http/api";
import {
  mailProps,
  passwordProps,
  initialLoginFormState,
} from "./credentialsFormProps";
import { useForm } from "../../hooks/useForm";

import "./credentials.css";

export const LoginForm = (props) => {
  const { setToken, dispatch } = props;
  const [
    { email, password, errorMessage },
    handleInputChange,
    setErrorMessage,
    resetInput,
  ] = useForm(initialLoginFormState);

  const items = [
    { ...mailProps, value: email },
    {
      ...passwordProps,
      value: password,
    },
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
      {...actions}
    />
  );
};
