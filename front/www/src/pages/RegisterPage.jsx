import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Article } from '../components/common/Article';
import { RegisterForm } from '../components/Credentials/RegisterForm';
import * as A from '../context/Auth.actions';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const RegisterPage = (props) => {
  const { logged, dispatch } = props;
  const localToken = JSON.parse(window.localStorage.getItem('token'));
  const [token, setToken] = useLocalStorage(localToken || '', 'token');

  useEffect(() => {
    if (token !== '') {
      //? Aquí se haría una llamada a la API para verificar el token,
      //? normalmente se hace a una ruta /me en caso de que sea correcto se despacha.
      try {
        const getRemoteData = async (token) => {
          const res = await fetch('http://localhost:8337/me', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
          const json = await res.json();
          if (json.ok) {
            const { decodedToken } = json;
            dispatch(
              //? dispatch es el método que contiene las acciones.
              //? es el cinturón de batman del contexto.
              //? si el token es correcto seteamos el state con los datos recibidos del servidor
              A.authSuccess({
                username: decodedToken.username,
                email: decodedToken.email,
                id: decodedToken.id,
                photo: decodedToken.photo,
                bio: decodedToken.bio,
                status: decodedToken.status,
              })
            );
          } else {
            dispatch(A.authFailure());
          }
        };
        getRemoteData(token);
      } catch (error) {
        //? en caso de error o fallo en la petición,
        //? del cinturón de batman escogemos la herramienta que resetea el estado.
        dispatch(A.authFailure());
      }
    }
    // eslint-disable-next-line;
  }, []);

  // console.log(token);
  if (logged) return <Redirect to="/" />;

  return (
    <section>
      <Article title={props.title}>
        <RegisterForm {...props} dispatch={dispatch} setToken={setToken} />
      </Article>
    </section>
  );
};
