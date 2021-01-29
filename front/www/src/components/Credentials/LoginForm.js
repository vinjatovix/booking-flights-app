import React from "react";
import { ListDrawer } from "../common/ListDrawer/ListDrawer";
import "./credentials.css";

const loginInputs = [
  {
    type: "email",
    name: "userMail",
    id: "userMail",
    placeholder: "Em@il",
    required: "required",
  },
  {
    type: "password",
    name: "password",
    id: "password",
    placeholder: "password",
    required: "required",
  },
  {
    type: "submit",
    value: "Entrar",
  },
];
export const LoginForm = () => {
  //TODO: state para el auth, email, etc... probablemente custom hook
  return (
    <form
      className="credentialsForm"
      method="post"
      action="/login"
      encType="multipart/form-data"
    >
      <ListDrawer type="inputs" items={loginInputs} />
    </form>
  );
};
