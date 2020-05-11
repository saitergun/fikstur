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
    userScores: [],
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
    case 'SET_USER_SCORE':
      const match = state.data.userScores.find((m) => m.match === payload.match);

      if (match) {
        if (match.score && match.score.length && !isNaN(match.score[0]) && !isNaN(match.score[1])) {
          match.score = payload.score;
        }
      } else {
        state.data.userScores.push(payload);
      }

      setTimeout(() => {
        localStorage.setItem('fixture-saved:user-scores', JSON.stringify(state.data.userScores));
      }, 100);

      return {...state};
    case 'REMOVE_USER_SCORE':
      const findUserScoreIndex = state.data.userScores.findIndex((m) => m.match === payload);
      state.data.userScores.splice(findUserScoreIndex, 1);
      
      const findMatch = state.data.matches.find((m) => m.id === payload);
      findMatch.score = [];

      setTimeout(() => {
        localStorage.setItem('fixture-saved:user-scores', JSON.stringify(state.data.userScores));
      }, 100);

      return {...state};
    default:
      return state;
  };
};

// create context
export const StoreContext = React.createContext(rootState);

// create Store
const Store = (props) => {
  const [state, dispatch] = React.useReducer(reducer, rootState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
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
