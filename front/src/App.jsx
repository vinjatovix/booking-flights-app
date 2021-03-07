import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { FlightProvider } from "./context/flight/Flight.context";
import { useAuthContext } from "./context/auth/Auth.context";

import { AboutPage } from "./pages/AboutPage";
import { CredentialsPage } from "./pages/CredentialsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SearchPage } from "./pages/SearchPage";

import { CustomModal } from "./components/Modal/Modal";
import { Disclaimer } from "./components/common/Disclaimer/Disclaimer";
import { Footer } from "./components/common/Footer";
import { Header } from "./components/Header/Header";
import { Main } from "./components/common/Main";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { PublicRoute } from "./components/common/PublicRoute";

import {
  FlightReducer,
  initialFlightFormState,
} from "./context/flight/Flight.reducers";
import { useLocalStorage } from "./hooks/useLocalStorage";

import ProfilePhoto from "./assets/svg/imagen-de-usuario-con-fondo-negro.svg";
import { askMeForToken, getPhoto } from "./http/api";

import "./css/index.css";

const App = () => {
  const [
    {
      bio,
      disclaimer,
      email,
      google,
      logged,
      menu,
      modal,
      modal_data,
      photo,
      profile_bookings,
      profile_data,
      profile_pass,
      profile_tools,
      username,
    },
    dispatch,
  ] = useAuthContext();

  const [token, setToken] = useLocalStorage(
    JSON.parse(localStorage.getItem("token")) || "",
    "token"
  );

  useEffect(() => {
    askMeForToken(logged, token, dispatch);
  }, [token, logged, dispatch, disclaimer]);

  useEffect(() => {
    getPhoto(photo, token, dispatch);
  }, [photo, dispatch, token]);

  const controlProps = {
    bio,
    disclaimer,
    dispatch,
    email,
    google,
    logged,
    menu,
    modal,
    photo: photo || ProfilePhoto,
    profile_bookings,
    profile_data,
    profile_pass,
    profile_tools,
    setToken,
    token,
    username,
  };

  return (
    <div className="App">
      <FlightProvider
        initialState={initialFlightFormState}
        reducer={FlightReducer}
      >
        <Router>
          <Header {...controlProps} />
          <Main className="app-main" {...controlProps}>
            {modal && <CustomModal>{modal_data}</CustomModal>}
            {!disclaimer && (
              <CustomModal className="Disclaimer radius animate__animated animate__backInUp">
                <Disclaimer />
              </CustomModal>
            )}

            <Switch>
              <Route path="/login">
                <PublicRoute>
                  <CredentialsPage title="Log In" {...controlProps} />
                </PublicRoute>
              </Route>
              <Route path="/register">
                <PublicRoute>
                  <CredentialsPage title="Sign Up" {...controlProps} />
                </PublicRoute>
              </Route>
              <Route path="/about">
                <AboutPage menu={menu} />
              </Route>

              <Route path="/profile">
                <PrivateRoute>
                  <ProfilePage {...controlProps} />
                </PrivateRoute>
              </Route>
              <Route path="/">
                <SearchPage title="Buscador" {...controlProps} />
              </Route>
            </Switch>
          </Main>
          <Footer className="app-footer">
            Code-Vix &copy; 2021 FLanders v0.6
          </Footer>
        </Router>
      </FlightProvider>
    </div>
  );
};

export default App;
