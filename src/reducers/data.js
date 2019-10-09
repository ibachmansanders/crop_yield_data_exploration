// action types
export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'LOAD_DATA_ERROR';
export const UPDATE_GRAPH_DATA = 'UPDATE_GRAPH_DATA';
export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export const UPDATE_SELECTED_DATA = 'UPDATE_SELECTED_DATA';

// initial state
const initialState = {
  features: null,
  quantiles: {},
  barChartData: [{ name: '', total_yield: 0, total_harvested_acres: 0 }],
  mouseOver: null,
  selected: [],
  selectedData: [],
  loading: false,
  error: null,
};

// action creators
export const loadData = () => ({ type: LOAD_DATA });
export const loadDataSuccess = (payload) => ({ type: LOAD_DATA_SUCCESS, payload });
export const loadDataError = (payload) => ({ type: LOAD_DATA_ERROR, payload });
export const updateGraphData = (payload) => ({ type: UPDATE_GRAPH_DATA, payload });
export const updateSelected = (payload) => ({ type: UPDATE_SELECTED, payload });
export const updateSelectedData = (payload) => ({ type: UPDATE_SELECTED_DATA, payload });

// selectors
export const getFeatures = (state) => state.data.features;
export const getQuantiles = (state) => state.data.quantiles;
export const getSelected = (state) => state.data.selected;
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
    case UPDATE_SELECTED: {
      const { selected } = state;
      // state includes selected, remove it
      if (selected.includes(payload)) selected.splice(selected.indexOf(payload), 1);
      // state doesn't include selected, add it
      else if (selected.length < 5) {
        selected.push(payload);
      }
      return state;
    }
    case UPDATE_SELECTED_DATA: {
      const { selectedData } = state;
      const { id } = payload;
      const dataIndex = selectedData.findIndex((data) => data.id === id);
      // state includes selected data, remove it
      if (dataIndex !== -1) selectedData.splice(dataIndex, 1);
      // state doesn't include selected, add it
      else {
        selectedData.push(payload);
      }
      const outData = JSON.parse(JSON.stringify(selectedData));
      return { ...state, selectedData: outData };
    }
    default:
      return state;
  }
};
