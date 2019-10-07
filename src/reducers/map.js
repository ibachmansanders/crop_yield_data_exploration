// action types
export const SET_MAP = 'SET_MAP';
export const SET_INFOWINDOW = 'SET_INFOWINDOW';
export const FETCH_STATES = 'FETCH_STATES';
export const FETCH_STATES_SUCCESS = 'FETCH_STATES_SUCCESS';
export const FETCH_STATES_ERROR = 'FETCH_STATES_ERROR';

// initial state
const initialState = {
  map: null,
  infoWindow: null,
  // parameters: type of crop, year, and vis = what is being visualized
  crop: 'CORN',
  year: 2018,
  vis: 'total_yield',
};

// action creators
export const setMap = (payload) => ({ type: SET_MAP, payload });
export const setInfoWindow = (payload) => ({ type: SET_INFOWINDOW, payload });

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
    default:
      return state;
  }
};
