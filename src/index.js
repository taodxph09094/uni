import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';
// import i18n from 'i18n';
import './i18n';
import './assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/argon-dashboard-react.scss';
import './scss/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    {/* <I18nextProvider i18n={i18n}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </I18nextProvider> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
module.hot.accept();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
