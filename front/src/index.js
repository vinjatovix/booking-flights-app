import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { AuthProvider } from './context/auth/Auth.context';
import { reducer, initialState } from './context/auth/Auth.reducers';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider initialState={initialState} reducer={reducer}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
