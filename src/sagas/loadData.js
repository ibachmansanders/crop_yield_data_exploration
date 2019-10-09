import { takeLatest, put, select } from 'redux-saga/effects';
import qs from 'querystring';
import { UPDATE_PARAM, getStateLayer, getCountyLayer, getParams } from '../reducers/map';
import { LOAD_DATA, loadDataError, loadDataSuccess, updateGraphData } from '../reducers/data';

import mapData from '../utils/mapData';

function* loadDataSaga() {
  const { crop, year, vis, scope } = yield select(getParams);
  // clear unecessary layers
  const stateLayer = yield select(getStateLayer);
  if (scope === 'county') stateLayer.setStyle({ visible: false });
  const countyLayer = yield select(getCountyLayer);
  if (scope === 'state') countyLayer.setStyle({ visible: false });
  try {
    // load crop data
    const { data, quantiles, aggregate, error } = yield fetch(`/api/yield?${qs.stringify({ crop, year, vis, scope })}`).then((data) => data.json());
    if (error) {
      console.warn(`There was an error in the server fetching the ${scope} yields: `, error);
      yield put(loadDataError(error));
      return;
    }

    // create data graphing array
    const barChartData = [];
    Object.values(data).forEach((row) => {
      const { state_code, county_fips, county_name, total_harvested_acres, total_yield, total_production } = row;
      let id = state_code;
      let name = state_code;
      if (scope === 'county') {
        id = county_fips;
        name = `${county_name}-${state_code}`;
      }
      barChartData.push({ id, name, total_harvested_acres, total_yield: Number(total_yield), total_production: Number(total_production) });
    });

    // store the geoJSON and data
    yield put(loadDataSuccess({ data, quantiles }));
    yield put(updateGraphData({ barChartData, aggregate }));

    // map the data
    mapData(data, scope === 'state' ? stateLayer : countyLayer, scope === 'state' ? 'state_code' : 'county_fips', vis, quantiles);
  } catch (error) {
    console.warn(`There was an error fetching the ${scope} yields data: `, error);
    yield put(loadDataError(error));
  }
}

export default function* projectsListener() {
  yield takeLatest(LOAD_DATA, loadDataSaga);
  yield takeLatest(UPDATE_PARAM, loadDataSaga);
}
