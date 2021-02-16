import React, { createContext, useContext, useReducer } from 'react';

/* Contexto */
export const FlightContext = createContext();

/* Proveedor */
export const FlightProvider = React.memo(({ reducer, initialState, children }) => (
  <FlightContext.Provider value={useReducer(reducer, initialState)}>{children}</FlightContext.Provider>
));

/* Cuando invocamos este hook se puede desestructurar un array con esta firma
const [{datoState1,datoStateX}, dispatch]= useAuthContext() 
EJ en App */
export const useFlightContext = () => useContext(FlightContext);
