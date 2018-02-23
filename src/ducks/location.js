import {LOCATION_CHANGE} from 'react-router-redux';
import * as utils from '../utils/duckHelpers';
import {fromJS} from 'immutable';

export const types = {
	LOCATION_PUSH: 'LOCATION_PUSH',
	LOCATION_BACK: 'LOCATION_BACK',
	LEGACY_LOCATION_CHANGE: 'LEGACY_LOCATION_CHANGE',
	LOCATION_CHANGE: LOCATION_CHANGE,
	LOCATION_QUERY: 'LOCATION_QUERY'
};

export const actions = {
	locationRedirect: payload => utils.action(types.LOCATION_REDIRECT, payload),
	locationPush: payload => utils.action(types.LOCATION_PUSH, {payload}),
	locationBack: () => utils.action(types.LOCATION_BACK),
	legacyLocationChange: payload => utils.action(types.LEGACY_LOCATION_CHANGE, payload),
	locationQuery: payload => utils.action(types.LOCATION_QUERY, payload)
};

const initialState = utils.initialState({
	locationBeforeTransitions: null
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.LOCATION_CHANGE:
			if (state.hasIn(['locationBeforeTransitions', 'pathname'])) {
				action.payload.route = state.getIn(['locationBeforeTransitions', 'pathname']);
			} else {
				action.payload.route = '/';
			}

			return state.set('locationBeforeTransitions', fromJS(action.payload));

		default:
			return state;
	}
};

export const selectors = {
	getLocation: state => state.getIn(['location', 'locationBeforeTransitions']),
	getPathname: state => selectors.getLocation(state).get('pathname'),
	getQuery: state => selectors.getLocation(state).get('query'),
	getPage: state => selectors.getLocation(state).getIn(['query', 'page']) || 1
};
