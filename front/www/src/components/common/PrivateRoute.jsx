import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth.context';

export const PrivateRoute = ({ children }) => {
  const [{ logged }] = useAuthContext();
  return <>{logged ? children : <Redirect to="/login" />}</>;
};
