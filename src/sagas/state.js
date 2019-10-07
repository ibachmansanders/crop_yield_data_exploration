import { takeLatest, put, select } from 'redux-saga/effects';
import qs from 'querystring';
import { getMap, getParams } from '../reducers/map';
import { getStates, getStateQuantiles, fetchStatesError, fetchStatesSuccess, FETCH_STATES } from '../reducers/state';

import mapData from '../utils/mapData';

function* fetchStatesSaga() {
  try {
    const map = yield select(getMap);
    const { crop, year, vis } = yield select(getParams);
    const states = yield select(getStates);
    const stateQuantiles = yield select(getStateQuantiles);

    // use existing data if possible
    if (states && stateQuantiles) {
      // load market data to the map
      mapData(map, states, vis, stateQuantiles);
      return;
    }

    // resetting map data, clear it
    map.data.forEach((feature) => map.data.remove(feature));

    // TODO: if the state layer is off, don't render it
    // if (!visible) return;

    // if viewing state the app needs new data, load it
    const { data, quantiles, error } = yield fetch(`/api/state?${qs.stringify({ crop, year })}`).then((data) => data.json());
    if (error) {
      console.warn('There was an error in the server fetching the state yields: ', error);
      yield put(fetchStatesError(error));
      return;
    }

    // store the geoJSON and data
    yield put(fetchStatesSuccess({ data, quantiles }));
    console.log(map, data, vis, quantiles);
    // add the data to the map
    mapData(map, data, vis, quantiles);
  } catch (error) {
    console.warn('There was an error fetching the state yields data: ', error);
    yield put(fetchStatesError(error));
  }
}

export default function* projectsListener() {
  yield takeLatest(FETCH_STATES, fetchStatesSaga);
}
