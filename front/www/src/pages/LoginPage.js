import React from "react";
import { LoginForm } from "../components/Credentials/LoginForm";
import { Article } from "../components/common/Article";

export const LoginPage = () => {
  return (
      <section>
        <Article title="Log in">
          <LoginForm />
        </Article>
      </section>
  );
};
