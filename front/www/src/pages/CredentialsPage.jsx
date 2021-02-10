import React, { useEffect } from 'react';

import { Article } from '../components/common/Article';
import { LoginForm } from '../components/Credentials/LoginForm';
import { Redirect } from 'react-router-dom';

import { RegisterForm } from '../components/Credentials/RegisterForm';

export const CredentialsPage = (props) => {
  const { logged, dispatch, title, setToken } = props;

  return (
    <>
      {/* {logged && <Redirect to="/" />} */}
      <section>
        <Article title={props.title}>
          {title === 'Log In' && <LoginForm {...props} dispatch={dispatch} setToken={setToken} />}
          {title === 'Sign In' && <RegisterForm {...props} dispatch={dispatch} setToken={setToken} />}
        </Article>
      </section>
    </>
  );
};
