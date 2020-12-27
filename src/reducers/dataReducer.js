const initialState = {
  teams: [],
  matches: [],
  season: 20202021,
};

const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_TEAMS':
      state.teams = payload;

      return {...state};
    case 'SET_MATCHES':
      state.matches = payload;
  
      return {...state};
    case 'SET_SEASON':
      state.season = payload;
  
      return {...state};
    default:
      return state;
  };
};

export default dataReducer;
