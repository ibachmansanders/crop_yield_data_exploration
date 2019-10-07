import { fork, all } from 'redux-saga/effects';
import state from './state';

const sagas = [
  state,
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));
  yield all([...globalSagasForks]);
}

export default globalSagas;
