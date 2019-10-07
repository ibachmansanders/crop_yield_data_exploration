// action types
export const FETCH_COUNTIES = 'FETCH_COUNTIES';
export const FETCH_COUNTIES_SUCCESS = 'FETCH_COUNTIES_SUCCESS';
export const FETCH_COUNTIES_ERROR = 'FETCH_COUNTIES_ERROR';

// initial state
const initialState = {
  counties: null,
  quantiles: {},
  county: null,
  loading: false,
  error: null,
};

// action creators
export const fetchStates = () => ({ type: FETCH_COUNTIES_ERROR });
export const fetchStatesSuccess = (payload) => ({ type: FETCH_COUNTIES_SUCCESS, payload });
export const fetchStatesError = (payload) => ({ type: FETCH_COUNTIES_ERROR, payload });

// selectors
export const getStates = (state) => state.map.counties;
export const getStateQuantiles = (state) => state.map.quantiles;

// reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COUNTIES:
      return { ...state, counties: null, quantiles: {}, loading: true, error: null };
    case FETCH_COUNTIES_SUCCESS:
      return { ...state, counties: payload.data, quantiles: payload.quantiles, loading: false, error: null };
    case FETCH_COUNTIES_ERROR:
      return { ...state, counties: null, quantiles: {}, loading: false, error: payload };
    default:
      return state;
  }
};
