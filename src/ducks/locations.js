import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	...utils.requestTypes('LOCATIONS'),
	LOCATIONS_SET: 'LOCATIONS_SET'
};

export const actions = {
	locationsSet: obj => utils.action(types.LOCATIONS_SET, obj)
};

const initialState = fromJS([]);

export default (state = initialState, action) => {
	switch (action.type) {
		case types.LOCATIONS_SET:
			return fromJS(action.payload);

		default:
			return state;
	}
};

const getLocations = state => state.getIn(['app', 'locations']);

export const selectors = {
	getLocations: createSelector([getLocations], m => m)
};
