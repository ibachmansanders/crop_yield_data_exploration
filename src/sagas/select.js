import { takeLatest, select } from 'redux-saga/effects';
import { getParams, getCountyLayer, getStateLayer } from '../reducers/map';
import { UPDATE_SELECTED, getSelected } from '../reducers/data';

import config from '../config';

function* selectSaga() {
  const selected = yield select(getSelected);
  const { scope } = yield select(getParams);

  let layer;
  let idProperty;
  if (scope === 'state') {
    layer = yield select(getStateLayer);
    idProperty = 'state_code';
  }
  if (scope === 'county') {
    layer = yield select(getCountyLayer);
    idProperty = 'county_fips';
  }

  layer.forEach((feature) => {
    const id = feature.getProperty(idProperty);
    // highlight the state outline if selected
    if (selected.includes(id)) {
      const strokeColor = config.selectColors[selected.indexOf(id)];
      layer.overrideStyle(feature, { strokeColor, strokeWeight: 2 });
    } else {
      layer.overrideStyle(feature, { strokeColor: '#4F834D', strokeWeight: 1 });
    }
  });
}

export default function* projectsListener() {
  yield takeLatest(UPDATE_SELECTED, selectSaga);
}
