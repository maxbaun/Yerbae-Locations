import {combineReducers} from 'redux-immutable';
import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';

import * as utils from '../utils/duckHelpers';
import data from './data';

export const types = {
	...utils.requestTypes('APP'),
	APP_RESET: 'APP_RESET',
	APP_INIT: 'APP_INIT'
};

export const actions = {
	appRequest: obj => utils.action(types.APP_REQUEST, obj),
	appSuccess: response => utils.action(types.APP_SUCCESS, {response}),
	appFailure: error => utils.action(types.APP_FAILURE, {error}),
	appReset: obj => utils.action(types.APP_RESET, obj),
	appInit: obj => utils.action(types.APP_INIT, obj)
};

const initialState = Map();

function status(state = initialState, action) {
	switch (action.type) {
		case types.APP_REQUEST:
			if (action.fetch && state.has(action.fetch)) {
				return state.update(action.fetch, s => {
					return s.set('request', fromJS(action.payload))
						.set('loading', true)
						.delete('success')
						.delete('error');
				});
			}

			if (action.fetch && !state.has(action.fetch)) {
				return state.set(action.fetch, fromJS({
					request: action.payload,
					loading: true
				}));
			}

			return state;

		case types.APP_SUCCESS:
			if (action.fetch) {
				return state.update(action.fetch, s => s.set('success', fromJS(action.payload)).set('loading', false));
			}

			return state;

		case types.APP_FAILURE:
			if (action.fetch) {
				return state.update(action.fetch, s => s.set('error', fromJS(action.payload)).set('loading', false));
			}

			return state;

		case types.APP_RESET:
			if (state.has(action.fetch)) {
				return state.set(action.fetch, fromJS({
					request: null,
					loading: false
				}));
			}

			return state;

		default:
			return state;
	}
}

export default combineReducers({
	status,
	data
});

const getStatus = state => state.getIn(['app', 'status']);

export const selectors = {
	getStatus: createSelector([getStatus], s => s)
};
