// action types
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSESNACKBAR';

// reducer with initial state
const initialState = {
  open: false,
  type: 'info',
  content: null,
};

// actions
export const openSnackbar = (payload) => ({ type: OPEN_SNACKBAR, payload });
export const closeSnackbar = (payload) => ({ type: CLOSE_SNACKBAR, payload });

// selectors
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_SNACKBAR:
      return { ...state, open: true, type: payload.type, content: payload.content };
    case CLOSE_SNACKBAR:
      return initialState;
    default:
      return state;
  }
};
