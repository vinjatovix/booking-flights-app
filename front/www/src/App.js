import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/index.css';
import { Header } from './components/Header/Header';
import { Main } from './components/common/Main';
import { SearchForm } from './components/SearchForm/SearchForm';
import { MenuPage } from './pages/MenuPage';
import { CredentialsPage } from './pages/CredentialsPage';
import { AboutPage } from './pages/AboutPage';
import { Footer } from './components/common/Footer';

/* RENDER PROPS */
import { registerProps } from './registerProps';
import { loginProps } from './loginProps';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Main className="app-main">
          <MenuPage />
          <Switch>
            <Route path="/login">
              <LoginPage {...loginProps} />
            </Route>
            <Route path="/register">
              <RegisterPage {...registerProps} />
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
