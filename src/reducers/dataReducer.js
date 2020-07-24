const initialState = {
  teams: [],
  matches: [],
};

const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_TEAMS':
      state.teams = payload;

      return {...state};
    case 'SET_MATCHES':
        state.matches = payload;
  
        return {...state};
    default:
      return state;
  }
}

export default dataReducer;
