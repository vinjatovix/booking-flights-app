import React, { createContext, useContext, useReducer } from "react";

export const FlightContext = createContext();

export const FlightProvider = ({ reducer, initialState, children }) => (
  <FlightContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </FlightContext.Provider>
);

export const useFlightContext = () => useContext(FlightContext);
