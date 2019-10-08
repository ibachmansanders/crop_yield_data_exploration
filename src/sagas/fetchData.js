import { takeLatest, put, select } from 'redux-saga/effects';
import qs from 'querystring';
import { UPDATE_PARAM, getMap, getParams, updateGraphData } from '../reducers/map';
import { fetchStatesError, fetchStatesSuccess, FETCH_STATES } from '../reducers/state';

import mapData from '../utils/mapData';

function* fetchStatesSaga() {
  try {
    const map = yield select(getMap);
    const { crop, year, vis } = yield select(getParams);

    // resetting map data, clear it
    map.data.forEach((feature) => map.data.remove(feature));

    // if viewing state the app needs new data, load it
    const { data, quantiles, error } = yield fetch(`/api/state?${qs.stringify({ crop, year })}`).then((data) => data.json());
    if (error) {
      console.warn('There was an error in the server fetching the state yields: ', error);
      yield put(fetchStatesError(error));
      return;
    }

    // create harvestData and yieldData arrays
    const harvestData = [];
    const yieldData = [];
    if (data.features && data.features.length) {
      data.features.forEach((feature) => {
        const { state_code, total_harvested_acres, total_yield } = feature.properties;
        harvestData.push({ id: state_code, name: state_code, total_harvested_acres });
        yieldData.push({ id: state_code, name: state_code, total_yield });
      });
    }

    // store the geoJSON and data
    yield put(fetchStatesSuccess({ data, quantiles }));
    yield put(updateGraphData({ harvestData, yieldData }));

    // add the data to the map
    mapData(map, data, vis, quantiles);
  } catch (error) {
    console.warn('There was an error fetching the state yields data: ', error);
    yield put(fetchStatesError(error));
  }
}

export default function* projectsListener() {
  yield takeLatest(FETCH_STATES, fetchStatesSaga);
  yield takeLatest(UPDATE_PARAM, fetchStatesSaga);
}
