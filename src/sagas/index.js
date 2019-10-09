import { fork, all } from 'redux-saga/effects';
import loadGeometry from './loadGeometry';
import loadData from './loadData';
import select from './select';

const sagas = [
  loadData,
  loadGeometry,
  select,
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));
  yield all([...globalSagasForks]);
}

export default globalSagas;
