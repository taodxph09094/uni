// export const GET_TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
export const BASE_API_URL = 'https://unibook-api-dev.nodo.vn/';
export const AUTH_URL = {
  LOGIN: 'api/login',
};
export const TRANSACTION_URL = {
  GET_LIST_TRANSACTION: '/payment/payments',
  GET_LIST_POS: '/api/pointOfSales',
  GET_LIST_SCHOOL: '/api/schools',
  GET_LIST_POS_SESSIONS: '/api/posSessions',
  GET_LIST_CANTEENS: '/api/canteens',
};

export const BUSINESS_URL = {
  GET_LIST_MERCHANT: '/api/merchants',
  GET_MERCHANT_DETAILS: '/api/merchants/',
  GET_OWNERS: '/owners',
  POST_OWNERS: '/createOwner',
  GET_STAFFS: '/staffs',
  POST_STAFF: '/createStaff',
  GET_LIST_POS: '/allPos',
  GET_LIST_BESTSELLER: '/bestSellers',
  GET_ALL_CATEGORIES: '/allCategories',
  GET_LIST_SALE_ORDERS: '/api/saleOrders',
  GET_SALE_ORDER_DETAILS: '/api/saleOrders/details',
  GET_LINE_SALE_ORDER: '/api/saleOrders/',
  LINE: '/lines',
};

export const SYSTEM_URL = {
  GET_LIST_USER: '/api/users',
  GROUP: '/groups',
  GET_LIST_MERCHANT: '/api/merchants/nameSearch',
  ALL_POS: '/allPos',
  UPDATE_USER: '/updateGeneralUser',
  CHANGE_PASSWORD: '/changePassword',
  GET_LIST_GROUPS: '/api/groups',
  GET_LIST_PERMISSIONS: '/api/permissions/all',
  GET_LIST_MENUS: '/api/menus/all',
  NOT_LINKED_GROUP: '/notLinkedGroups',
  ALLOWED_MENUS: '/allowedMenus',
  PERMISSIONS: '/permissions',
  REMOVE_GROUP_FROM_USER: '/unlinkGroup',
  ADD_GROUP_TO_USER: '/linkGroups',
  UNLINK_MENU: '/unlinkMenu',
  ADD_MENUS: '/addMenus',
  ADD_PERMISSIONS: '/addPermissions',
  UNLINK_PERMISSIONS: '/unlinkPermissions',
  CREATE_USER: '/createGeneralUser',
};
