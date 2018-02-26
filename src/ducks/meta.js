import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	LOCATIONS_META_SET: 'LOCATIONS_META_SET'
};

export const actions = {
	locationsMetaSet: payload => utils.action(types.LOCATIONS_META_SET, payload)
};

const initialState = utils.initialState({
	locations: {}
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.LOCATIONS_META_SET:
			return state.set('locations', fromJS(action.payload));

		default:
			return state;
	}
};

const getMeta = state => state.getIn(['app', 'meta']);

export const selectors = {
	getMeta: createSelector([getMeta], m => m),
	getLocationsMeta: createSelector([getMeta], u => u.get('locations'))
};
