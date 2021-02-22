import React from 'react';

import { Article } from '../components/common/index';
import { LoginForm } from '../components/Credentials/LoginForm';
import { RegisterForm } from '../components/Credentials/RegisterForm';

export const CredentialsPage = (props) => {
  const { title, menu } = props;
  const css = menu ? 'radius blur' : 'radius focus';
  return (
    <Article className={css} title={title}>
      {title === 'Log In' && <LoginForm {...props} />}
      {title === 'Sign Up' && <RegisterForm {...props} />}
    </Article>
  );
};
