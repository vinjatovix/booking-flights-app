import React from "react";
import { ListDrawer } from "../common/ListDrawer/ListDrawer";

const inputs = [
  {
    type: "text",
    name: "username",
    id: "username",
    placeholder: "User Name",
    required: "required",
  },
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
    type: "password",
    name: "repeatPassword",
    id: "repeatPassword",
    placeholder: "Repeat password",
    required: "required",
  },
  {
    type: "text",
    name: "bio",
    id: "bio",
    placeholder: "Bio",
  },
  {
    type: "submit",
    value: "Registro",
  },
];

export const RegisterForm = () => {
  return (
    <form
      className="credentialsForm"
      method="post"
      action="/login"
      encType="multipart/form-data"
    >
      <ListDrawer type="inputs" items={inputs}></ListDrawer>
    </form>
  );
};
