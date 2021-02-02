import React from 'react';
import { Article } from '../components/common/Article';
// import { CredentialsForm } from '../components/Credentials/CredentialsForm';
import { LoginForm } from '../components/Credentials/LoginForm';

export const LoginPage = (props) => {
  console.log(props);
  return (
    <section>
      <Article title={props.title}>
        <LoginForm {...props} />
      </Article>
    </section>
  );
};
