import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicRouter from './routes/PublicRouter';
import ProtectRouter from './routes/ProtectRouter';

import './scss/style.scss';
import { useDispatch } from 'react-redux';
import { getMe } from './reducer/AuthSlide';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Pages
const Login = React.lazy(() => import('./components/login/Login'));
const Register = React.lazy(() => import('./components/register/Register'));

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <PublicRouter exact path="/login" name="Login Page" component={Login} />
          <PublicRouter exact path="/register" name="Register" component={Register} />
          <ProtectRouter path="/" name="Home" component={TheLayout} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}


export default App;
