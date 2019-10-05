import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import globalSagas from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// provide devtools to middleware
const reduxDevTools = global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__();

const middlewareEnhansor = applyMiddleware(sagaMiddleware);
// create Redux store
const store = middlewareEnhansor(createStore)(rootReducer, reduxDevTools);

// run the sagas
sagaMiddleware.run(globalSagas);

export default store;
