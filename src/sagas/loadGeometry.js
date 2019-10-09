/* global google: true */
import { takeLatest, put, select } from 'redux-saga/effects';
import { LOAD_GEOMETRY, getMap, loadGeometrySuccess, loadGeometryError } from '../reducers/map';
import { loadData } from '../reducers/data';

function* loadGeometrySaga() {
  try {
    const map = yield select(getMap);
    // load state geometry from DB, hten county (so that states are available immediatley)
    const { stateGeometry, error } = yield fetch('/api/geometry/state').then((data) => data.json());
    if (error) {
      console.warn('There was an error in the server loading the state geometry: ', error);
      yield put(loadGeometryError(error));
      return;
    }
    // create the data layer to style
    const stateLayer = new google.maps.Data({ map });
    stateLayer.setStyle({ visible: false });
    stateLayer.addGeoJson(stateGeometry);
    // store the geoJSON
    stateLayer.toJSON = () => '<StateLayer>';
    yield put(loadGeometrySuccess({ stateLayer }));

    // load county geometry
    const { countyGeometry, error: _error } = yield fetch('/api/geometry/county').then((data) => data.json());
    if (error) {
      console.warn('There was an error in the server loading the county geometry: ', error);
      yield put(loadGeometryError(_error));
      return;
    }
    // create the data layer to style
    const countyLayer = new google.maps.Data({ map });
    countyLayer.setStyle({ visible: false });
    countyLayer.addGeoJson(countyGeometry);
    // store the geoJSON
    countyLayer.toJSON = () => '<countyLayer>';
    yield put(loadGeometrySuccess({ countyLayer }));

    // success? call some data
    yield put(loadData());
  } catch (error) {
    console.warn('There was an error fetching the geometry: ', error);
    yield put(loadGeometryError(error));
  }
}

export default function* listener() {
  yield takeLatest(LOAD_GEOMETRY, loadGeometrySaga);
}
