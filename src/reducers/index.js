import { combineReducers } from 'redux';

import map from './map';
import data from './data';

// combine all app reducers together
export default combineReducers({
  map,
  data,
});
