// action types
export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'LOAD_DATA_ERROR';
export const UPDATE_GRAPH_DATA = 'UPDATE_GRAPH_DATA';

// initial state
const initialState = {
  features: null,
  quantiles: {},
  barChartData: [{ name: '', total_yield: 0, total_harvested_acres: 0 }],
  aggregate: [],
  loading: false,
  error: null,
};

// action creators
export const loadData = () => ({ type: LOAD_DATA });
export const loadDataSuccess = (payload) => ({ type: LOAD_DATA_SUCCESS, payload });
export const loadDataError = (payload) => ({ type: LOAD_DATA_ERROR, payload });
export const updateGraphData = (payload) => ({ type: UPDATE_GRAPH_DATA, payload });

// selectors
export const getFeatures = (state) => state.data.features;
export const getQuantiles = (state) => state.data.quantiles;

// reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_DATA:
      return { ...state, features: null, quantiles: {}, loading: true, error: null };
    case LOAD_DATA_SUCCESS:
      return { ...state, features: payload.data, quantiles: payload.quantiles, loading: false, error: null };
    case LOAD_DATA_ERROR:
      return { ...state, features: null, quantiles: {}, loading: false, error: payload };
    case UPDATE_GRAPH_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};
