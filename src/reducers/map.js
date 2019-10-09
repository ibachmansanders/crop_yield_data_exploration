// action types
export const SET_MAP = 'SET_MAP';
export const SET_INFOWINDOW = 'SET_INFOWINDOW';
export const LOAD_GEOMETRY = 'LOAD_GEOMETRY';
export const LOAD_GEOMETRY_SUCCESS = 'LOAD_GEOMETRY_SUCCESS';
export const LOAD_GEOMETRY_ERROR = 'LOAD_GEOMETRY_ERROR';
export const UPDATE_PARAM = 'UPDATE_PARAM';

// initial state
const initialState = {
  map: null,
  infoWindow: null,
  loading: false,
  stateLayer: null,
  countyLayer: null,
  // parameters: type of crop, year, scope, and vis = what is being visualized
  crop: 'CORN',
  year: 2018,
  scope: 'state',
  vis: 'total_yield',
};

// action creators
export const setMap = (payload) => ({ type: SET_MAP, payload });
export const setInfoWindow = (payload) => ({ type: SET_INFOWINDOW, payload });
export const updateParam = (payload) => ({ type: UPDATE_PARAM, payload });
export const loadGeometry = () => ({ type: LOAD_GEOMETRY });
export const loadGeometrySuccess = (payload) => ({ type: LOAD_GEOMETRY_SUCCESS, payload });
export const loadGeometryError = (payload) => ({ type: LOAD_GEOMETRY_ERROR, payload });

// selectors
export const getMap = (state) => state.map.map;
export const getInfoWindow = (state) => state.map.infoWindow;
export const getStateLayer = (state) => state.map.stateLayer;
export const getCountyLayer = (state) => state.map.countyLayer;
export const getParams = ({ map: { crop, year, vis, scope } }) => ({ crop, year, vis, scope });

// reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MAP:
      return { ...state, map: payload };
    case SET_INFOWINDOW:
      return { ...state, infoWindow: payload };
    case LOAD_GEOMETRY:
      return { ...state, stateLayer: null, countyLayer: null, loading: true, error: null };
    case LOAD_GEOMETRY_SUCCESS:
      return { ...state, loading: false, error: null, ...payload };
    case LOAD_GEOMETRY_ERROR:
      return { ...state, stateLayer: null, countyLayer: null, loading: false, error: payload };
    case UPDATE_PARAM:
      return { ...state, ...payload };
    default:
      return state;
  }
};
