import React, { useEffect } from 'react';
import { node } from 'prop-types';

import useMatches from './hooks/useMatches';

const rootState = {
  app: {
    name: 'fikstür',
    url: window.location.origin + window.location.pathname,

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
    case 'SET_TEAMS':
      state.data.teams = payload;

      return {...state};
    case 'SET_MATCHES':
        state.data.matches = payload;
  
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

  const matches = useMatches(20192020);

  // set matches
  useEffect(() => {
    if (state.data.matches.length === 0) {
      setState({ type: 'SET_MATCHES', payload: matches });
    }
  }, [matches, state.data.matches.length]);

  // set teams
  useEffect(() => {
    if (state.data.teams.length === 0) {
      import('./data/teams').then((response) => {
        setState({ type: 'SET_TEAMS', payload: response.default });
      });
    }
  }, [state.data.teams.length]);

  // set app loading status
  useEffect(() => {
    if (state.data.teams.length && state.data.matches.length) {
      setState({ type: 'SET_APP_LOADING_STATUS', payload: false });
    }
  }, [state.data.matches.length, state.data.teams.length]);

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
