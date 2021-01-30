import React from 'react';
import { Article } from '../components/common/Article';
import { CredentialsForm } from '../components/Credentials/CredentialsForm';
import { RegisterForm } from '../components/Credentials/RegisterForm';

export const RegisterPage = (props) => {
  return (
    <section>
      <Article title={props.title}>
        <RegisterForm {...props} />
      </Article>
    </section>
  );
};
