const isDevelopment = process.env.NODE_ENV === 'development';

const initialState = {
  name: 'fikstür',
  url: window.location.origin + window.location.pathname,
  dirPublic: isDevelopment ? '/' : 'https://raw.githubusercontent.com/saitergun/fikstur/master/public/',

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
