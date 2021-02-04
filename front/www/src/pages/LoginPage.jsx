import React from 'react';
import { Article } from '../components/common/Article';
import { Redirect } from 'react-router-dom';
// import { CredentialsForm } from '../components/Credentials/CredentialsForm';
import { LoginForm } from '../components/Credentials/LoginForm';
import { useAuthContext } from '../context/Auth.context';
import { useIsLogged } from '../hooks/useIsLogged';

export const LoginPage = (props) => {
  const [, dispatch] = useAuthContext();
  const token = JSON.parse(window.localStorage.getItem('auth'));
  const [data, refetch] = useIsLogged(token);

  console.log(data.ok);
  // if (data.ok && data.ok === true) {
  //   <Redirect to="/" />;
  // }

  return (
    <section>
      <Article title={props.title}>
        <LoginForm {...props} dispatch={dispatch} />
      </Article>
    </section>
  );
};
