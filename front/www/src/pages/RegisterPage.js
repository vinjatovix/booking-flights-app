import React from "react";
import { Article } from "../components/common/Article";
import { RegisterForm } from "../components/Credentials/RegisterForm";

export const RegisterPage = () => {
  return (
    <section>
      <Article title="Register">
        <RegisterForm />
      </Article>
    </section>
  );
};
