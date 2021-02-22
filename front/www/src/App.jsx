import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* ****************************
! CONTEXTO 
*******************************/
import { useAuthContext } from './context/auth/Auth.context';
import { FlightProvider } from './context/flight/Flight.context';

/* PÁGiNAS */
import { CredentialsPage } from './pages/CredentialsPage';
import { AboutPage } from './pages/AboutPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchPage } from './pages/SearchPage';

/* COMPONENTES */
import { Header } from './components/Header/Header';
import { Main, Footer, PublicRoute, PrivateRoute } from './components/common/index';
import { aboutProps, searchProps } from './pageProps';

/* HOOKS */
import { FlightReducer, initialFlightFormState } from './context/flight/Flight.reducers';
import { useLocalStorage } from './hooks/useLocalStorage';
import { askMeForToken } from './utils/askMeForToken';

import ProfilePhoto from './assets/svg/imagen-de-usuario-con-fondo-negro.svg';
import { getPhoto } from './http/api';

import './css/index.css';
// console.log(process.env.REACT_APP_BENDER_HOST);
const App = () => {
  /*
  ? de este hook (useAuthContext) podemos desestructurar un array, 
  ? del que la primera posición es un objeto con las claves del state, 
  ? y el segundo el método para manipular estos estados 
  */
  const [
    { menu, logged, username, email, bio, photo, profile_data, profile_pass, profile_bookings, profile_tools, modal },
    dispatch,
  ] = useAuthContext();

  const [token, setToken] = useLocalStorage(JSON.parse(localStorage.getItem('token')) || '', 'token');

  useEffect(() => {
    askMeForToken(logged, token, dispatch);
  }, [token, logged, dispatch]);

  useEffect(() => {
    getPhoto(photo, token, dispatch);
  }, [photo, dispatch, token]);
  /* 
  ? Estas propiedades se envían a las paginas que necesitan tratar con la autorización
   */

  const controlProps = {
    profile_data,
    profile_pass,
    profile_bookings,
    profile_tools,
    dispatch,
    menu,
    logged,
    username,
    email,
    bio,
    photo: photo || ProfilePhoto,
    setToken,
    token,
    modal,
  };

  return (
    <div className="App">
      <FlightProvider initialState={initialFlightFormState} reducer={FlightReducer}>
        <Router>
          <Header />
          <Main setToken={setToken}>
            <Switch>
              <Route path="/login">
                <PublicRoute>
                  <CredentialsPage title="Log In" {...controlProps} />
                </PublicRoute>
              </Route>

              <Route path="/register">
                <PublicRoute>
                  <CredentialsPage title="Sign Up" {...controlProps} />
                </PublicRoute>
              </Route>

              <Route path="/about">
                <AboutPage {...aboutProps} />
              </Route>

              <Route path="/profile">
                <PrivateRoute>
                  <ProfilePage {...controlProps} />
                </PrivateRoute>
              </Route>

              <Route path="/">
                <SearchPage {...searchProps} />
              </Route>
            </Switch>
          </Main>
          <Footer />
        </Router>
      </FlightProvider>
    </div>
  );
};

export default App;
