import { takeLatest, put, select } from 'redux-saga/effects';
import qs from 'querystring';
import { UPDATE_PARAM, getInfoWindow, getMap, getStateLayer, getCountyLayer, getParams } from '../reducers/map';
import { LOAD_DATA, loadDataError, loadDataSuccess, updateGraphData, updateSelected } from '../reducers/data';
import { openSnackbar } from '../reducers/feedback';

import mapData from '../utils/mapData';

import store from '../store';

function* loadDataSaga() {
  const { crop, year, vis, scope } = yield select(getParams);
  const infoWindow = yield select(getInfoWindow);
  const map = yield select(getMap);
  // clear unecessary layers
  const stateLayer = yield select(getStateLayer);
  const countyLayer = yield select(getCountyLayer);
  if (scope === 'county' && stateLayer) stateLayer.setStyle({ visible: false });
  if (scope === 'state' && countyLayer) countyLayer.setStyle({ visible: false });
  try {
    // load crop data
    const { data, quantiles, error } = yield fetch(`/api/yield?${qs.stringify({ crop, year, vis, scope })}`).then((data) => data.json());
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
    yield put(updateGraphData({ barChartData }));

    // map the data
    let layer = stateLayer;
    let keyProperty = 'state_code';
    let name = 'state_code';
    if (scope === 'county') {
      layer = countyLayer;
      keyProperty = 'county_fips';
      name = 'county_name';
    }

    // store clicked features in state for graphing
    layer.addListener('click', (event) => {
      const { feature } = event;
      // update the store's selected array by adding or removing the feature
      const id = feature.getProperty(keyProperty);
      const { selected } = store.getState().data;
      if (selected.length === 5) {
        store.dispatch(openSnackbar({ type: 'warning', content: 'Maximum 5 Items selected' }));
        return;
      }
      store.dispatch(updateSelected(id));
    });
    // track mouseover of feature identifiers
    layer.addListener('mouseover', (event) => {
      // update mousOver
      const mouseOver = event.feature.getProperty(keyProperty);
      store.dispatch(updateGraphData({ mouseOver }));
      // open infoWindow (palceholder)
      // TODO: resolve hover issue
      // const { feature, latLng } = event;
      // const key = feature.getProperty(keyProperty);
      // infoWindow.setContent(`
      // <center><strong>${feature.getProperty(name)}</strong></center>
      //   <hr />
      //   <center>${vis.replace(/_/g, ' ').toUpperCase()}: ${data[key][vis]}</center>
      // `);
      // infoWindow.setPosition(latLng);
      // infoWindow.open(map);
    });
    layer.addListener('mouseout', () => {
      // remove mousover tracking
      store.dispatch(updateGraphData({ mouseOver: null }));
      // close infoWindow
      // infoWindow.close();
    });

    mapData(data, layer, keyProperty, vis, quantiles);
  } catch (error) {
    console.warn(`There was an error fetching the ${scope} yields data: `, error);
    yield put(loadDataError(error));
  }
}

export default function* projectsListener() {
  yield takeLatest(LOAD_DATA, loadDataSaga);
  yield takeLatest(UPDATE_PARAM, loadDataSaga);
}
