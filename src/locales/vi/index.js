import flatten from 'flat';
import login from './login.json';
import common from './common.json';
import merchant from './merchants.json';
import saleOrders from './saleOrders.json';
import saleOrderDetails from './saleOrderDetails.json';
import pos from './pointOfSale.json';
import users from './users.json';
import menu from './menu.json';
import merchantDetails from './merchantDetails.json';
import posSessions from './posSessions.json';

const locale = {
  login: flatten(login, {
    delimiter: '_',
  }),
  common: flatten(common, {
    delimiter: '_',
  }),
  merchant: flatten(merchant, {
    delimiter: '_',
  }),
  merchantDetails: flatten(merchantDetails, {
    delimiter: '_',
  }),
  saleOrders: flatten(saleOrders, {
    delimiter: '_',
  }),
  saleOrderDetails: flatten(saleOrderDetails, {
    delimiter: '_',
  }),
  pos: flatten(pos, {
    delimiter: '_',
  }),
  users: flatten(users, {
    delimiter: '_',
  }),
  menu: flatten(menu, {
    delimiter: '_',
  }),
  posSessions: flatten(posSessions, {
    delimiter: '_',
  }),
};
export default locale;
