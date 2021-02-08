import React, { useEffect } from 'react';

import { Article } from '../components/common/Article';
import { LoginForm } from '../components/Credentials/LoginForm';
import { Redirect } from 'react-router-dom';

import { askMeForToken } from '../utils/askMeForToken';
import { RegisterForm } from '../components/Credentials/RegisterForm';

export const CredentialsPage = (props) => {
  const { logged, dispatch, title, token, setToken } = props;
  useEffect(() => {
    askMeForToken(logged, token, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (logged) return <Redirect to="/" />;

  return (
    <>
      {logged && <Redirect to="/" />}
      <section>
        <Article title={props.title}>
          {title === 'Log In' && <LoginForm {...props} dispatch={dispatch} setToken={setToken} />}
          {title === 'Sign In' && <RegisterForm {...props} dispatch={dispatch} setToken={setToken} />}
        </Article>
      </section>
    </>
  );
};
