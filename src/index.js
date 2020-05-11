import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';

import Store from './store';

import './styles/css/app.css';

import App from './components/App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Store>
    {/* <React.StrictMode> */}
      <HashRouter basename='/'>
        <App />
      </HashRouter>
    {/* </React.StrictMode> */}
  </Store>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
