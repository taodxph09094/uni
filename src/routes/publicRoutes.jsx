import { lazy } from 'react';
import withErrorBoundary from 'components/HOCs/withErrorBoundary';
import { RouteBase } from 'constants/routeUrl';
import Login from 'views/Login';
// import Dashboard from 'views/Index';
// const HomePage = lazy(() => import('views/Home'));
// const Dashboard = lazy(() => import('views/Dashboard'));
// const Page404 = lazy(() => import('views/Page404'));

const publicRoutes = [
  // List Public URL
  {
    path: RouteBase.Login,
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: withErrorBoundary(Login),
    layout: '/auth',
  },
];
export default publicRoutes;
