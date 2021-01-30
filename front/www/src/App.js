import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

import './css/index.css';
import { Header } from './components/Header/Header';
import { Main } from './components/common/Main';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MenuPage } from './pages/MenuPage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Main className="app-main">
          <MenuPage />
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <h1>Inicio</h1>
            </Route>
          </Switch>
        </Main>
      </Router>
      <footer className="app-footer">Code-Vix &copy; 2021</footer>
    </div>
  );
};

export default App;
