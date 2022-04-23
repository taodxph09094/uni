import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PrivateRoute from 'components/PrivateRoute';
import { checkAuth } from 'redux/modules/auth';
import Admin from 'layout/DefaultLayout/Admin';
import Auth from 'layout/DefaultLayout/Auth';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  //! Render
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path={RouteBase.Login} exact component={LoginPage} /> */}
        <Route path={'/admin'} component={Admin} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
