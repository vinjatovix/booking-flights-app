import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <h1>Inicio</h1>
          </Route>
          <Route path="/login">
            <h1>Login</h1>
          </Route>
          <Route path="/register">
            <h1>Register</h1>
          </Route>
          <Route path="/about">
            <h1>About</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
