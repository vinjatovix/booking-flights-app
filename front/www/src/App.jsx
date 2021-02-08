import React from 'react';
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

/* HOOKS */
import { FlightReducer, initialFlightFormState } from './context/flight/Flight.reducers';
import { useLocalStorage } from './hooks/useLocalStorage';

// console.log(process.env.REACT_APP_BENDER_HOST);
const App = () => {
  /*
  ? de este hook (useAuthContext) podemos desestructurar un array, 
  ? del que la primera posición es un objeto con las claves del state, 
  ? y el segundo el método para manipular estos estados 
  */
  const [{ menu, logged }, dispatch] = useAuthContext();

  const [token, setToken] = useLocalStorage(JSON.parse(window.localStorage.getItem('token')) || '', 'token');

  /* 
  ? Estas propiedades se envían a las paginas que necesitan tratar con la autorización
   */
  const controlProps = {
    dispatch,
    logged,
    setToken,
    token,
  };

  return (
    <div className="App">
      {/* //TODO: Intentar eliminar este div, añade un nivel de profundidad innecesario a la jerarquía, el css se le puede aplicar al elemento div root en el html original */}
      <Router>
        <Header props={{ menu, dispatch }} />
        <Main className="app-main">
          {menu ? <Menu {...controlProps} /> : null}
          <Switch>
            {/* //TODO: mapear las rutas con Routes.map() */}
            <Route path="/login">
              <CredentialsPage title="Log In" action="http://localhost:8337/login" method="POST" {...controlProps} />
            </Route>
            <Route path="/register">
              <CredentialsPage title="Sign In" action="http://localhost:8337/signin" method="POST" {...controlProps} />
            </Route>
            <Route path="/about">
              <AboutPage url="http://localhost:8337/about" />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/">
              <FlightProvider initialState={initialFlightFormState} reducer={FlightReducer}>
                <SearchPage />
              </FlightProvider>
            </Route>
          </Switch>
        </Main>
      </Router>
      <Footer dispatch={dispatch} setToken={setToken} />
    </div>
  );
};

export default App;
