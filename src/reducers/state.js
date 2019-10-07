// action types
export const FETCH_STATES = 'FETCH_STATES';
export const FETCH_STATES_SUCCESS = 'FETCH_STATES_SUCCESS';
export const FETCH_STATES_ERROR = 'FETCH_STATES_ERROR';

// initial state
const initialState = {
  states: null,
  quantiles: [],
  state: null,
  loading: false,
  error: null,
};

// action creators
export const fetchStates = () => ({ type: FETCH_STATES });
export const fetchStatesSuccess = (payload) => ({ type: FETCH_STATES_SUCCESS, payload });
export const fetchStatesError = (payload) => ({ type: FETCH_STATES_ERROR, payload });

// selectors
export const getStates = (state) => state.map.states;
export const getStateQuantiles = (state) => state.map.quantiles;

// reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STATES:
      return { ...state, states: null, quantiles: null, loading: true, error: null };
    case FETCH_STATES_SUCCESS:
      return { ...state, states: payload.data, quantiles: payload.quantiles, loading: false, error: null };
    case FETCH_STATES_ERROR:
      return { ...state, states: null, quantiles: null, loading: false, error: payload };
    default:
      return state;
  }
};
