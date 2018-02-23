import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import {createLogger} from 'redux-logger';
import {Map, fromJS} from 'immutable';
import Ducks from './ducks/root';
import Sagas from './sagas/root';

const store = browserHistory => {
	const initialState = fromJS(window.INITIAL_STATE) || Map();
	const history = routerMiddleware(browserHistory);
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [
		history,
		sagaMiddleware
	];
	let composeEnhancers = compose;

	if (
		process.env.NODE_ENV === 'production' && // eslint-disable-line
		window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
		Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
	) {
		window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
	}

	if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') { // eslint-disable-line
		// middlewares.push(createLogger());
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	}

	const DataStore = createStore(
		Ducks,
		initialState,
		composeEnhancers(applyMiddleware(...middlewares))
	);

	sagaMiddleware.run(Sagas);

	return DataStore;
};

export default store;
