import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Article } from '../components/common/Article';
import { RegisterForm } from '../components/Credentials/RegisterForm';
import { AuthContext } from '../context/Auth.context';

export const RegisterPage = (props) => {

  const [auth] = useContext(AuthContext);
  if (auth !== '') return <Redirect to="/" />;

  return (
    <section>
      <Article title={props.title}>
        <RegisterForm {...props} />
      </Article>
    </section>
  );
};
