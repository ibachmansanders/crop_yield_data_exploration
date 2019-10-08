import { fork, all } from 'redux-saga/effects';
import fetchData from './fetchData';

const sagas = [
  fetchData,
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));
  yield all([...globalSagasForks]);
}

export default globalSagas;
