import { takeLatest, put, select } from 'redux-saga/effects';
import qs from 'querystring';
import { getParams, getCountyLayer, getStateLayer } from '../reducers/map';
import { UPDATE_SELECTED, getSelected, updateSelectedData } from '../reducers/data';

import config from '../config';

function* selectSaga({ payload: selectId }) {
  try {
    const selected = yield select(getSelected);
    const { crop, vis, scope } = yield select(getParams);

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

    // get chart data for the selected feature
    const chartData = yield fetch(`/api/yield/${selectId}?${qs.stringify({ crop, vis, scope })}`).then((data) => data.json());
    yield put(updateSelectedData(chartData));
  } catch (error) {
    console.log('There was an error selecting data: ', error);
  }
}

export default function* projectsListener() {
  yield takeLatest(UPDATE_SELECTED, selectSaga);
}
