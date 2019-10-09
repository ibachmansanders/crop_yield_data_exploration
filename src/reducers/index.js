import { combineReducers } from 'redux';

import map from './map';
import data from './data';
import feedback from './feedback';

// combine all app reducers together
export default combineReducers({
  map,
  data,
  feedback,
});
