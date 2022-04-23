import axios from 'axios';
import { BASE_API_URL } from '../constants/api';
import { CodeConstants } from '../constants/ApiCode';
import { logout } from 'redux/modules/auth';
import authServices from 'services/authServices';
import store from '../redux/store';

const instance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    // Do something before api is sent
    const authData = authServices.getUserLocalStorage();

    if (authData?.access_token) {
      config.headers.Authorization = `Bearer ${authData?.access_token}`;
    }
    if (authData?.language) {
      config.headers['Accept-Language'] = authData?.language;
    }
    return config;
  },
  (error) => {
    // Do something with api error
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    // if (response?.data?.message) {
    //   if (
    //     response?.data?.message.includes(CodeConstants.UnAuthorized) ||
    //     response?.data?.message.includes(CodeConstants.authorizedEn)
    //   ) {
    //     // store.dispatch(
    //     //   showAlert({
    //     //     alertMessage: response.data?.message,
    //     //     isShowAlert: true,
    //     //     alertType: 'default',
    //     //     alertTitle: i18next.t('common.alert'),
    //     //   }),
    //     // );
    //   }
    // }

    return response;
  },
  async (error) => {
    // Do something with response error
    const { response, message } = error || {};
    const { data } = response || {};
    if (response.status === CodeConstants.UnAuthorized) {
      if (response?.data?.code !== CodeConstants.BAD_CREDENTIALS) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(response);
  },
);

export const getData = (url, data) => {
  return instance.get(url, { params: data });
};

export const postData = (url, data) => {
  return instance.post(url, data);
};

export const putData = (url, data) => {
  return instance.put(url, data);
};

export const deleteData = (url, data) => {
  return instance.delete(url, data);
};
