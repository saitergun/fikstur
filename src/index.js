import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { StoreProvider } from './store';

import './styles/css/app.css';

import App from './components/App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StoreProvider>
    <HashRouter basename='/'>
      <App />
    </HashRouter>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
