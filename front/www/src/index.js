import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/Auth.context';
import { reducer, initialState } from './context/Auth.reducers';


ReactDOM.render(
  <AuthProvider initialState={initialState} reducer={reducer}>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
