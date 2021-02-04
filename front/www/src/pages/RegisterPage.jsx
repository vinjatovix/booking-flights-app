import React from 'react';
import { Redirect } from 'react-router-dom';
import { Article } from '../components/common/Article';
import { RegisterForm } from '../components/Credentials/RegisterForm';
import { useAuthContext } from '../context/Auth.context';

export const RegisterPage = (props) => {
  const [{ logged }, dispatch] = useAuthContext();

  if (logged === true) return <Redirect to="/" />;

  return (
    <section>
      <Article title={props.title}>
        <RegisterForm {...props} dispatch={dispatch} />
      </Article>
    </section>
  );
};
