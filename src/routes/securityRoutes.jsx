import withErrorBoundary from 'components/HOCs/withErrorBoundary';
import { RouteBase } from 'constants/routeUrl';
import PointOfSales from 'views/Bussiness/PointOfSales';
import Dashboard from 'views/Dashboard/index';
import TransactionList from 'views/Transactions/List';
import Merchants from '../views/Bussiness/Merchants/Merchants';
import i18next from 'i18next';
import MerchantDetails from '../views/Bussiness/Merchants/MerchantDetails';
import CreateMerchant from '../views/Bussiness/Merchants/MUpdateMerchant';
import SaleOrders from '../views/Bussiness/SaldeOrders/SaleOrders';
import Users from '../views/System/Users/Users';
import SaleOrderDetails from '../views/Bussiness/SaldeOrders/SaleOrderDetails';
import UserDetails from '../views/System/Users/UserDetails';
import UserGroups from '../views/System/UserGroups/UserGroups';
import UserGroupDetails from '../views/System/UserGroups/UserGroupDetails';
import PosSessions from '../views/Bussiness/PosSessions';
import Schools from '../views/System/Schools';
import Canteens from '../views/System/Canteens';
import SchoolDetail from '../views/System/SchoolDetail';
import CanteenDetail from '../views/System/CanteenDetail';
import PointOfSalesDetail from '../views/Bussiness/PointOfSalesDetail';
// import Dashboard from 'views/Index';
// const HomePage = lazy(() => import('views/Home'));
// const Dashboard = lazy(() => import('views/Dashboard'));
// const Page404 = lazy(() => import('views/Page404'));

const securityRoutes = [
  // List Security URL
  {
    path: RouteBase.Dashboard,
    name: 'menu:sidebar.dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: withErrorBoundary(Dashboard),
    layout: '/admin',
    showInMenu: true,
  },
  {
    path: 'business',
    name: 'menu:sidebar.business',
    icon: 'ni ni-tv-2 text-primary',
    layout: '/admin',
    showInMenu: true,
    children: [
      {
        path: RouteBase.Merchants,
        name: 'menu:sidebar.merchants',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(Merchants),
        layout: '/admin',
        showInMenu: true,
      },
      {
        path: RouteBase.MerchantDetails,
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(MerchantDetails),
        layout: '/admin',
      },
      {
        path: RouteBase.SaleOrders,
        name: 'menu:sidebar.saleOrders',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(SaleOrders),
        layout: '/admin',
        showInMenu: true,
      },
      {
        path: RouteBase.SaleOrdersDetail,
        name: 'menu:sidebar.saleOrdersDetail',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(SaleOrderDetails),
        layout: '/admin',
      },
      {
        path: RouteBase.PointOfSale,
        name: 'menu:sidebar.pointOfSales',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(PointOfSales),
        layout: '/admin',
        showInMenu: true,
      },
      {
        path: RouteBase.PosSessions,
        name: 'menu:sidebar.posSessions',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(PosSessions),
        layout: '/admin',
        showInMenu: true,
      },
      {
        path: RouteBase.POSDetail,
        component: withErrorBoundary(PointOfSalesDetail),
        layout: '/admin',
      },
    ],
  },
  {
    path: 'system',
    name: 'menu:sidebar.system',
    icon: 'ni ni-tv-2 text-primary',
    layout: '/admin',
    showInMenu: true,
    children: [
      {
        path: RouteBase.User,
        name: 'menu:sidebar.users',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(Users),
        layout: '/admin',
        showInMenu: true,
      },
      {
        path: RouteBase.UserDetails,
        name: 'menu:sidebar.user_details',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(UserDetails),
        layout: '/admin',
      },
      {
        path: RouteBase.UserGroup,
        name: 'menu:sidebar.user_group',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(UserGroups),
        layout: '/admin',
        showInMenu: true,
      },
      {
        path: RouteBase.UserGroupDetails,
        name: 'menu:sidebar.userGroupDetails',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(UserGroupDetails),
        layout: '/admin',
      },
      {
        path: RouteBase.Schools,
        name: 'menu:sidebar.schools',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(Schools),
        layout: '/admin',
        showInMenu: true,
      },
      {
        path: RouteBase.Canteens,
        name: 'menu:sidebar.canteens',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(Canteens),
        layout: '/admin',
        showInMenu: true,
      },
      {
        path: RouteBase.SchoolDetail,
        component: withErrorBoundary(SchoolDetail),
        layout: '/admin',
      },
      {
        path: RouteBase.CanteenDetail,
        component: withErrorBoundary(CanteenDetail),
        layout: '/admin',
      },
    ],
  },
  {
    path: 'transaction',
    name: 'Transaction',
    icon: 'ni ni-tv-2 text-primary',
    // component: withErrorBoundary(TransactionList),
    layout: '/admin',
    children: [
      {
        path: RouteBase.TransactionList,
        name: 'List',
        icon: 'ni ni-tv-2 text-primary',
        component: withErrorBoundary(TransactionList),
        layout: '/admin',
      },
    ],
  },
];

export default securityRoutes;
