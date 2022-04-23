import * as httpServices from './httpServices';
import { AUTH_URL } from '../constants/api';
class AuthServices {
  postLogin(username, password) {
    return httpServices.postData(AUTH_URL.LOGIN, { username, password });
  }
  saveUserLocalStorage(data = {}) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  setUserLanguage(language) {
    localStorage.setItem('language_selected', language);
  }

  getUserLanguage() {
    return localStorage.getItem('language_selected');
  }

  getUserLocalStorage() {
    const dataUser = localStorage.getItem('user');
    if (!!dataUser) {
      return JSON.parse(dataUser);
    }
    return {};
  }

  clearUserLocalStorage() {
    localStorage.removeItem('user');
  }
}

export default new AuthServices();
