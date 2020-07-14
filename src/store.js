import React from 'react';
import { node } from 'prop-types';

const rootState = {
  app: {
    name: 'fikstür',

    loading: true,
    loadingErrorText: null,
  },

  data: {
    teams: [],
    matches: [],
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_APP_LOADING_STATUS':
      state.app.loading = payload;

      return {...state};
    case 'SET_APP_LOADING_ERROR_TEXT':
      state.app.loadingErrorText = payload;

      return {...state};
    case 'PUSH_TEAMS':
      state.data.teams.push(...payload);

      return {...state};
    case 'PUSH_MATCHES':
      state.data.matches.push(...payload);

      return {...state};
    default:
      return state;
  };
};

// create context
export const StoreContext = React.createContext(rootState);

// create Store
const Store = (props) => {
  const [state, setState] = React.useReducer(reducer, rootState);

  return (
    <StoreContext.Provider value={{ state, setState }}>
      { props.children }
    </StoreContext.Provider>
  )
}

Store.defaultProps = {
  children: null
}

Store.propTypes = {
  children: node
}

export default Store;
