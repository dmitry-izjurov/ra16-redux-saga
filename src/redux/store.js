import {createStore, combineReducers, applyMiddleware, compose,} from 'redux';
import createSagaMiddleware from 'redux-saga';
import skillsReducer from './reducers/skills';
import servicesReducer from './reducers/services';
import saga from './sagas';

const reducer = combineReducers({ skills: skillsReducer, services: servicesReducer });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(saga);

export default store;