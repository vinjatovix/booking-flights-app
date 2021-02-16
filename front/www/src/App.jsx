import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/index.css';

/* ****************************
! CONTEXTO 
*******************************/
import { useAuthContext } from './context/Auth.context';
import { FlightProvider } from './context/flight/Flight.context';

/* PÁGiNAS */
import { CredentialsPage } from './pages/CredentialsPage';
import { AboutPage } from './pages/AboutPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchPage } from './pages/SearchPage';

/* COMPONENTES */
import { Header } from './components/Header/Header';
import { Main } from './components/common/Main';
import { Footer } from './components/common/Footer';
import { aboutProps, searchProps } from './pageProps';
import { CustomModal } from './components/Modal/Modal';

/* HOOKS */
import { FlightReducer, initialFlightFormState } from './context/flight/Flight.reducers';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PublicRoute } from './components/common/PublicRoute';
import { PrivateRoute } from './components/common/PrivateRoute';
import { askMeForToken } from './utils/askMeForToken';

// console.log(process.env.REACT_APP_BENDER_HOST);
const App = () => {
  /*
  ? de este hook (useAuthContext) podemos desestructurar un array, 
  ? del que la primera posición es un objeto con las claves del state, 
  ? y el segundo el método para manipular estos estados 
  */
  const [
    {
      menu,
      logged,
      username,
      email,
      bio,
      photo,
      profile_data,
      profile_pass,
      profile_bookings,
      profile_tools,
      modal,
      modal_data,
    },
    dispatch,
  ] = useAuthContext();

  const [token, setToken] = useLocalStorage(JSON.parse(localStorage.getItem('token')) || '', 'token');

  useEffect(() => {
    askMeForToken(logged, token, dispatch);
  }, [token, logged, dispatch]);
  /* 
  ? Estas propiedades se envían a las paginas que necesitan tratar con la autorización
   */
  const profileProps = {
    profile_data,
    profile_pass,
    profile_bookings,
    profile_tools,
  };

  const controlProps = {
    dispatch,
    menu,
    logged,
    username,
    email,
    bio,
    photo,
    setToken,
    token,
    modal,
  };

  return (
    <div className="App">
      <FlightProvider initialState={initialFlightFormState} reducer={FlightReducer}>
        <Router>
          <Header {...controlProps} />
          <Main className="app-main" {...controlProps}>
            {modal && <CustomModal>{modal_data}</CustomModal>}

            <Switch>
              <Route path="/login">
                <PublicRoute>
                  <CredentialsPage title="Log In" {...controlProps} />
                </PublicRoute>
              </Route>
              <Route path="/register">
                <PublicRoute>
                  <CredentialsPage title="Sign In" {...controlProps} />
                </PublicRoute>
              </Route>
              <Route path="/about">
                <AboutPage {...aboutProps} />
              </Route>

              <Route path="/profile">
                <PrivateRoute>
                  <ProfilePage control={controlProps} profile={profileProps} />
                </PrivateRoute>
              </Route>
              <Route path="/">
                <SearchPage {...searchProps} {...controlProps} />
              </Route>
            </Switch>
          </Main>
          <Footer className="app-footer">Code-Vix &copy; 2021 FLanders v0.6</Footer>
        </Router>
      </FlightProvider>
    </div>
  );
};

export default App;
