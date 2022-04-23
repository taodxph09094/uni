/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import { Alert } from 'components/GlobalAlert/Alert';
import securityRoutes from 'routes/securityRoutes';
import { GetAuthSelector } from 'redux/selectors/auth';
import authServices from 'services/authServices';
import { RouteBase } from 'constants/routeUrl';
const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const auth = GetAuthSelector();
  const dataUserStorage = authServices.getUserLocalStorage();
  const { isLogin } = auth;

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const generateChildrenRouter = (cRouter) => {
    if (cRouter.length > 0) {
      return cRouter.map((propC, keyC) => {
        return (
          <Route path={propC.layout + propC.path} component={propC.component} key={'routeP' + propC.path + keyC} />
        );
      });
    }
  };

  const getSecurityRoutes = (securityRoutes) => {
    if (dataUserStorage.isLogged || isLogin) {
      return securityRoutes.map((prop, key) => {
        if (prop.layout === '/admin') {
          if (prop?.children?.length > 0) {
            return generateChildrenRouter(prop?.children);
          } else {
            return <Route path={prop.layout + prop.path} component={prop.component} key={'routeP' + key} />;
          }
        } else {
          return null;
        }
      });
    } else {
      return <Redirect to={RouteBase.Login} />;
    }
  };

  const getListSecurityRoutes = () => {
    return securityRoutes.filter((route) => route.layout === '/admin' && route?.showInMenu === true);
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={getListSecurityRoutes()}
        logo={{
          innerLink: '/admin/dashboard',
          imgSrc: require('../../assets/img/brand/logo.png').default,
          imgAlt: '...',
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Alert />
        <AdminNavbar {...props} />
        <Switch>
          {getSecurityRoutes(securityRoutes)}
          <Redirect from="*" to="/admin/dashboard" />
        </Switch>
        {/* <Container fluid>
          <AuthFooter />
        </Container> */}
      </div>
    </>
  );
};

export default Admin;
