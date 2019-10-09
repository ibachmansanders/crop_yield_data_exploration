import { takeLatest, put, select } from 'redux-saga/effects';
import qs from 'querystring';
import { UPDATE_PARAM, getMap, getParams, updateGraphData } from '../reducers/map';
import { FETCH_DATA, fetchDataError, fetchDataSuccess, getCountyState } from '../reducers/data';

import mapData from '../utils/mapData';

function* fetchDataSaga() {
  try {
    const map = yield select(getMap);
    const { crop, year, vis } = yield select(getParams);
    const { county, state } = yield select(getCountyState);

    // resetting map data, clear it
    map.data.forEach((feature) => map.data.remove(feature));

    // if viewing state the app needs new data, load it
    const { data, quantiles, aggregate, error } = yield fetch(`/api/yield?${qs.stringify({ crop, year, vis, county, state })}`).then((data) => data.json());
    if (error) {
      console.warn('There was an error in the server fetching the state yields: ', error);
      yield put(fetchDataError(error));
      return;
    }

    // create harvestData and yieldData arrays
    const harvestData = [];
    const yieldData = [];
    if (data.features && data.features.length) {
      data.features.forEach((feature) => {
        const { state_code, total_harvested_acres, total_yield } = feature.properties;
        if (total_harvested_acres) harvestData.push({ id: state_code, name: state_code, total_harvested_acres });
        if (total_yield) yieldData.push({ id: state_code, name: state_code, total_yield });
      });
    }

    // store the geoJSON and data
    yield put(fetchDataSuccess({ data, quantiles }));
    yield put(updateGraphData({ harvestData, yieldData, aggregate }));

    if (data.features && data.features.length) {
      // add the data to the map
      mapData(map, data, vis, quantiles);
    }
  } catch (error) {
    console.warn('There was an error fetching the state yields data: ', error);
    yield put(fetchDataError(error));
  }
}

export default function* projectsListener() {
  yield takeLatest(FETCH_DATA, fetchDataSaga);
  yield takeLatest(UPDATE_PARAM, fetchDataSaga);
}
