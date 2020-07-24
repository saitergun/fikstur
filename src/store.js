import React from 'react';
import { node } from 'prop-types';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import appReducer from './reducers/appReducer';
import dataReducer from './reducers/dataReducer';

const reducers = {
  app: appReducer,
  data: dataReducer
};

const combinedReducer = combineReducers(reducers);

const store = createStore(combinedReducer);

export const StoreProvider = (props) => {
  return (
    <Provider store={store}>
      { props.children }
    </Provider>
  )
};

StoreProvider.defaultProps = {
  children: null
}

StoreProvider.propTypes = {
  children: node
}

export default store;
