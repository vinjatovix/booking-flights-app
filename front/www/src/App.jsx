import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/index.css';

/* ****************************
! CONTEXTO 
*******************************/
import { useAuthContext } from './context/Auth.context';
import * as A from './context/Auth.actions'; //? Estas son las acciones disponibles por el dispatch

/* PÁGiNAS */
import { AboutPage } from './pages/AboutPage';
import { MenuPage } from './pages/MenuPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';

/* COMPONENTES */
import { Header } from './components/Header/Header';
import { Main } from './components/common/Main';
import { SearchForm } from './components/SearchForm/SearchForm';
import { Footer } from './components/common/Footer';

/* RENDER PROPS */
import { loginProps } from './loginProps';

// console.log(process.env.REACT_APP_BENDER_HOST);
const App = () => {
  //TODO COMENTAR CON MATEO #####################################################
  /*
  ? de este hook (useAuthContext) podemos desestructurar un array, 
  ? del que la primera posición es un objeto con las claves del state, 
  ? y el segundo el método para manipular estos estados 
  */
  const [{ logged }, dispatch] = useAuthContext();

  useEffect(() => {
    if (!logged) {
      try {
        //? Aquí se haría una llamada a la API para verificar el token,
        //? normalmente se hace a una ruta /me en caso de que sea correcto se despacha.
        dispatch(
          //? dispatch es el método que contiene las acciones.
          //? es el cinturón de batman del contexto.
          //? si el token es correcto seteamos el state con los datos recibidos del servidor
          A.authSuccess({
            username: 'loco', //? del back end
            email: 'nu2a@mailinator.com', //? idem
            id: 33, //? idem
            //...
          })
        );
      } catch (error) {
        //? en caso de error o fallo en la petición,
        //? del cinturón de batman escogemos la herramienta que resetea el estado.
        dispatch(A.authFailure());
      }
    }
    // eslint-disable-next-line
  }, []);
  //! ################################################
  return (
    <div className="App">
      {' '}
      {/* //TODO: Intentar eliminar este div, añade un nivel de profundidad innecesario a la jerarquía, el css se le puede aplicar al elemento div root en el html original */}
      <Router>
        <Header />
        <Main className="app-main">
          <MenuPage />
          <Switch>
            {/* //TODO: mapear las rutas con Routes.map() */}
            <Route path="/login">
              <LoginPage {...loginProps} />
            </Route>
            <Route path="/register">
              <RegisterPage title="Sign In" action="http://localhost:8337/signin" method="POST" />
            </Route>
            <Route path="/about">
              <AboutPage url="http://localhost:8337/about" />
            </Route>
            <Route path="/">
              <SearchForm />
            </Route>
          </Switch>
        </Main>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
