import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AuthContext = React.createContext('');

const AuthProvider = ({ children, value: initialValue }) => {
  const [value, setValue] = useLocalStorage(initialValue, 'auth');
  return <AuthContext.Provider value={[value, setValue]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
