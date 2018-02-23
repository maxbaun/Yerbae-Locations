import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	...utils.requestTypes('DATA'),
	DATA_SET: 'DATA_SET'
};

export const actions = {
	dataSet: obj => utils.action(types.DATA_SET, obj)
};

const initialState = fromJS({});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.DATA_SET:
			return fromJS(action.payload);

		default:
			return state;
	}
};

const getData = state => state.getIn(['app', 'data']);

export const selectors = {
	getData: createSelector([getData], m => m)
};
