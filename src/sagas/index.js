import { fork, all } from 'redux-saga/effects';
import loadGeometry from './loadGeometry';
import loadData from './loadData';

const sagas = [
  loadData,
  loadGeometry,
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));
  yield all([...globalSagasForks]);
}

export default globalSagas;
