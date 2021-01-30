import React from 'react';
import { Article } from '../components/common/Article';
import { CredentialsForm } from '../components/Credentials/CredentialsForm';

const loginProps = {
  url: 'http://localhost:8337/login',
  method: 'POST',
  inputs: [
    {
      type: 'email',
      name: 'userMail',
      id: 'userMail',
      placeholder: 'Em@il',
      required: 'required',
    },
    {
      type: 'password',
      name: 'password',
      id: 'password',
      placeholder: 'password',
      required: 'required',
    },
    {
      id: 'submit-button',
      type: 'submit',
      value: 'Login',
    },
  ],
};

export const LoginPage = () => {
  return (
    <section>
      <Article title="Log in">
        <CredentialsForm inputs={loginProps.inputs} method={loginProps.method} action={loginProps.url} />
      </Article>
    </section>
  );
};
