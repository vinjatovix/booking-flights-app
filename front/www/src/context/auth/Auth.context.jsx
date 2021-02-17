import React, { createContext, useContext, useReducer } from 'react';

// TODO: RE EXPLICACIÓN DE ESTO, entiendo el hook useAuthContext, pero el provider cuando lo estoy usando?

/* Contexto */
export const AuthContext = createContext();

/* Proveedor */
export const AuthProvider = ({ reducer, initialState, children }) => (
  <AuthContext.Provider value={useReducer(reducer, initialState)}>{children}</AuthContext.Provider>
);

/* Cuando invocamos este hook se puede desestructurar un array con esta firma
const [{datoState1,datoStateX}, dispatch]= useAuthContext() 
EJ en App */
export const useAuthContext = () => useContext(AuthContext);
