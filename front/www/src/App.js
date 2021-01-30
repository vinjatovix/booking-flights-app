import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogoMenu from './assets/svg/bars-solid.svg';
import './css/index.css';
import { Main } from './components/common/Main';
import { AboutPage } from './pages/AboutPage';
// import { LoginPage } from './pages/LoginPage';
// import { RegisterPage } from './pages/RegisterPage';
import { MenuPage } from './pages/MenuPage';
import { Footer } from './components/common/Footer';
import { SearchForm } from './components/SearchForm/SearchForm';
import { registerProps } from './registerProps';
import { loginProps } from './loginProps';
import { CredentialsPage } from './pages/CredentialsPage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <header className="app-header">
          <h1>FL</h1>
          <a href="/menu" className="enlace">
            <img className="burguer" src={LogoMenu} alt="Botón de menú" />
          </a>
          {/* <nav>
            <ul>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </nav> */}
        </header>
        <Main className="app-main">
          <MenuPage />
          <Switch>
            <Route path="/login">
              <CredentialsPage {...loginProps} />
            </Route>
            <Route path="/register">
              <CredentialsPage {...registerProps} />
            </Route>
            <Route path="/about">
              <AboutPage />
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
