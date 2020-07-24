const initialState = {
  name: 'fikstür',
  url: window.location.origin + window.location.pathname,

  loading: true,
  loadingErrorText: null,
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_APP_LOADING_STATUS':
      state.loading = payload;

      return {...state};
    case 'SET_APP_LOADING_ERROR_TEXT':
      state.loadingErrorText = payload;

      return {...state};
    default:
      return state;
  }
}

export default appReducer;
