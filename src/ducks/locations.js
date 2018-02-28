import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	...utils.requestTypes('LOCATIONS'),
	LOCATIONS_SET: 'LOCATIONS_SET',
	LOCATIONS_IMPORT: 'LOCATIONS_IMPORT'
};

export const actions = {
	locationsSet: obj => utils.action(types.LOCATIONS_SET, obj),
	locationsSave: obj => utils.action(types.LOCATIONS_SAVE, obj),
	locationsCreate: obj => utils.action(types.LOCATIONS_CREATE, obj)
};

const initialState = fromJS([]);

export default (state = initialState, action) => {
	switch (action.type) {
		case types.LOCATIONS_SET:
			return fromJS(action.payload);

		case types.LOCATIONS_UPDATE:
			return state.update(s => {
				const node = s.find(l => l.get('_id') === action.payload.get('_id'));

				if (!node) {
					return s;
				}

				return s.set(s.indexOf(node), fromJS(action.payload));
			});

		default:
			return state;
	}
};

const getLocations = state => state.getIn(['app', 'locations']);

export const selectors = {
	getLocations: createSelector([getLocations], m => m)
};
