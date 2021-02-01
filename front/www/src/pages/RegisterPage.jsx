import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Article } from '../components/common/Article';
import { RegisterForm } from '../components/Credentials/RegisterForm';
import { useAuthContext } from '../context/Auth.context';

export const RegisterPage = (props) => {
  const [{ logged }, dispatch] = useAuthContext();

  console.log(logged);
  if (logged) return <Redirect to="/" />;

  return (
    <section>
      <Article title={props.title}>
        <RegisterForm {...props} />
      </Article>
    </section>
  );
};
