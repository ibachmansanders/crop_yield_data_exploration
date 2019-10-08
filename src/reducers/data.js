// action types
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

// initial state
const initialState = {
  features: null,
  quantiles: {},
  state: null,
  county: null,
  loading: false,
  error: null,
};

// action creators
export const fetchData = () => ({ type: FETCH_DATA });
export const fetchDataSuccess = (payload) => ({ type: FETCH_DATA_SUCCESS, payload });
export const fetchDataError = (payload) => ({ type: FETCH_DATA_ERROR, payload });

// selectors
export const getFeatures = (state) => state.data.features;
export const getQuantiles = (state) => state.data.quantiles;

// reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DATA:
      return { ...state, features: null, quantiles: {}, loading: true, error: null };
    case FETCH_DATA_SUCCESS:
      return { ...state, features: payload.data, quantiles: payload.quantiles, loading: false, error: null };
    case FETCH_DATA_ERROR:
      return { ...state, features: null, quantiles: {}, loading: false, error: payload };
    default:
      return state;
  }
};
