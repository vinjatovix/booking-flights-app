import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/index.css';

/* CONTEXTO */
import { useAuthContext } from './context/Auth.context';

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
import * as A from './context/Auth.actions';

console.log(process.env.REACT_APP_BENDER_HOST);
const App = () => {
  const [{ logged }, dispatch] = useAuthContext();

  useEffect(() => {
    if (!logged) {
      try {
        //? llamada API end point que verifica token "/me"
        dispatch(
          A.authSuccess({
            username: 'loco',
            email: 'nu2a@mailinator.com',
            id: 33,
          })
        );
      } catch (error) {
        dispatch(A.authFailure());
      }
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Main className="app-main">
          <MenuPage />
          <Switch>
            {/* Routes.map() */}
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
    </>
  );
};

export default App;
