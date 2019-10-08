// action types
export const SET_MAP = 'SET_MAP';
export const SET_INFOWINDOW = 'SET_INFOWINDOW';
export const UPDATE_PARAM = 'UPDATE_PARAM';
export const UPDATE_GRAPH_DATA = 'UPDATE_GRAPH_DATA';

// initial state
const initialState = {
  map: null,
  infoWindow: null,
  // parameters: type of crop, year, and vis = what is being visualized
  crop: 'CORN',
  year: 2018,
  vis: 'total_yield',
  harvestData: [{ name: '', total_harvested_acres: 0 }],
  yieldData: [{ name: '', total_yield: 0 }],
};

// action creators
export const setMap = (payload) => ({ type: SET_MAP, payload });
export const setInfoWindow = (payload) => ({ type: SET_INFOWINDOW, payload });
export const updateParam = (payload) => ({ type: UPDATE_PARAM, payload });
export const updateGraphData = (payload) => ({ type: UPDATE_GRAPH_DATA, payload });

// selectors
export const getMap = (state) => state.map.map;
export const getInfoWindow = (state) => state.map.infoWindow;
export const getParams = ({ map: { crop, year, vis } }) => ({ crop, year, vis });

// reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MAP:
      return { ...state, map: payload };
    case SET_INFOWINDOW:
      return { ...state, infoWindow: payload };
    case UPDATE_PARAM:
    case UPDATE_GRAPH_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};
