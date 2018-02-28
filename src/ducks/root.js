import {combineReducers} from 'redux-immutable';
import {routerReducer} from 'react-router-redux';
import location from './location';
import app from './app';
import state from './state';

const Ducks = combineReducers({
	routing: routerReducer,
	location,
	app,
	state
});

export default Ducks;
