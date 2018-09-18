import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	EXPORT_SET: 'EXPORT_SET'
};

export const actions = {
	exportSet: payload => utils.action(types.EXPORT_SET, payload)
};

const initialState = utils.initialState({
	export: null
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.EXPORT_SET:
			return state.set('export', action.payload);

		default:
			return state;
	}
};

const getFiles = state => state.getIn(['app', 'files']);

export const selectors = {
	getFiles: createSelector([getFiles], m => m)
};
