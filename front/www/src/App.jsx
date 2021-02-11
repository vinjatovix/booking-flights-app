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
import { Menu } from './components/Menu/Menu';
import { Footer } from './components/common/Footer';
import { aboutProps, searchProps } from './pageProps';

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
    { menu, logged, username, bio, photo, user_profile, profile_data, profile_pass, profile_bookings, profile_tools },
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
    bio,
    photo,
    setToken,
    token,
  };

  console.log(user_profile);

  return (
    <div className="App">
      <Router>
        <Header {...controlProps} />
        <Main className="app-main">
          {menu ? <Menu {...controlProps} /> : null}
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
              <FlightProvider initialState={initialFlightFormState} reducer={FlightReducer}>
                <SearchPage {...searchProps} {...controlProps} />
              </FlightProvider>
            </Route>
          </Switch>
        </Main>
      </Router>
      <Footer>Code-Vix &copy; 2021 FLanders v0.6</Footer>
    </div>
  );
};

export default App;
