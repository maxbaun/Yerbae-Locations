import {combineReducers} from 'redux-immutable';
import {routerReducer} from 'react-router-redux';
import location from './location';
import app from './app';

const Ducks = combineReducers({
	routing: routerReducer,
	location,
	app
});

export default Ducks;
