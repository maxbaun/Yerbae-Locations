import {fromJS, Map} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	USER_SET: 'USER_SET',
	USER_UNSET: 'USER_UNSET'
};

export const actions = {
	userSet: obj => utils.action(types.USER_SET, obj)
};

const initialState = Map();

export default (state = initialState, action) => {
	switch (action.type) {
		case types.USER_SET:
			return fromJS(action.payload);

		case types.USER_UNSET:
			return initialState;

		default:
			return state;
	}
};

const getUser = state => state.getIn(['app', 'user']);

export const selectors = {
	getUser: createSelector([getUser], m => m)
};
