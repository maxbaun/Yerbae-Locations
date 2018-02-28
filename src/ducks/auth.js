import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	...utils.requestTypes('AUTH'),
	AUTH_LOGIN: 'AUTH_LOGIN',
	AUTH_LOGOUT: 'AUTH_LOGOUT'
};

export const actions = {
	authLogin: obj => utils.action(types.AUTH_LOGIN, obj),
	authLogout: obj => utils.action(types.AUTH_LOGOUT, obj)
};

// const initialState = fromJS({});
//
// export default (state = initialState, action) => {
// 	switch (action.type) {
// 		case types.DATA_SET:
// 			return fromJS(action.payload);
//
// 		default:
// 			return state;
// 	}
// };
//
// const getData = state => state.getIn(['app', 'data']);
//
// export const selectors = {
// 	getData: createSelector([getData], m => m)
// };
