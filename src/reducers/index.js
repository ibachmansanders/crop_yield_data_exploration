import { combineReducers } from 'redux';

import map from './map';
import county from './county';
import state from './state';

// combine all app reducers together
export default combineReducers({
  map,
  county,
  state,
});
