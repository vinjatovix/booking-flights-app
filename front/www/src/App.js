import { React, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/index.css';
import { Header } from './components/Header/Header';
import { Main } from './components/common/Main';
import { SearchForm } from './components/SearchForm/SearchForm';
import { CredentialsPage } from './pages/CredentialsPage';
import { Menu } from './components/Menu/Menu';
import { AboutPage } from './pages/AboutPage';
import { Footer } from './components/common/Footer';

/* RENDER PROPS */
import { registerProps } from './registerProps';
import { loginProps } from './loginProps';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';

const App = () => {
  /* STATES */
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header props={{ open, setOpen }} />
        <Main className="app-main">
          {open ? <Menu /> : null}
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
            {/* <Route path="/">
              <SearchForm />
            </Route> */}
          </Switch>
        </Main>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
