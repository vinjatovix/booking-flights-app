import React from 'react';
import { Article } from '../components/common/Article';
import { Redirect } from 'react-router-dom';
// import { CredentialsForm } from '../components/Credentials/CredentialsForm';
import { LoginForm } from '../components/Credentials/LoginForm';
import { useAuthContext } from '../context/Auth.context';

export const LoginPage = (props) => {
  const [{ logged }, dispatch] = useAuthContext();

  if (logged === true) return <Redirect to="/" />;

  return (
    <section>
      <Article title={props.title}>
        <LoginForm {...props} dispatch={dispatch} />
      </Article>
    </section>
  );
};
