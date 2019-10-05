// action types
export const SET_MAP = 'SET_MAP';

// initial state
const initialState = {
  map: null,
};

// action creators
export const setMap = (payload) => ({ type: SET_MAP, payload });

// selectors
export const getMap = (state) => state.map.map;

// reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MAP:
      return { ...state, map: payload };
    default:
      return state;
  }
};
