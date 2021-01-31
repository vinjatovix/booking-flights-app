import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/index.css';

/* CONTEXTO */
import { AuthProvider } from './components/providers/AuthProvider';

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

const App = () => {
  return (
    <div className="App">
      <AuthProvider value={''}>
        <Router>
          <Header />
          <Main className="app-main">
            <MenuPage />
            <Switch>
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
      </AuthProvider>
    </div>
  );
};

export default App;
