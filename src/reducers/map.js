// action types
export const SET_MAP = 'SET_MAP';
export const SET_INFOWINDOW = 'SET_INFOWINDOW';
export const UPDATE_PARAM = 'UPDATE_PARAM';

// initial state
const initialState = {
  map: null,
  infoWindow: null,
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

// selectors
export const getMap = (state) => state.map.map;
export const getInfoWindow = (state) => state.map.infoWindow;
export const getParams = ({ map: { crop, year, vis, scope } }) => ({ crop, year, vis, scope });

// reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MAP:
      return { ...state, map: payload };
    case SET_INFOWINDOW:
      return { ...state, infoWindow: payload };
    case UPDATE_PARAM:
      return { ...state, ...payload };
    default:
      return state;
  }
};
