// action types
export const SET_MAP = 'SET_MAP';
export const SET_INFOWINDOW = 'SET_INFOWINDOW';

// initial state
const initialState = {
  map: null,
  infoWindow: null,
};

// action creators
export const setMap = (payload) => ({ type: SET_MAP, payload });
export const setInfoWindow = (payload) => ({ type: SET_INFOWINDOW, payload });
export const getInfoWindow = (state) => state.map.infoWindow;

// selectors
export const getMap = (state) => state.map.map;

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
