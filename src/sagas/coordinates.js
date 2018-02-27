import {takeEvery, call, put, all} from 'redux-saga/effects';

import {types as locationsTypes} from '../ducks/locations';
import {getCoordinatesFromAddress} from '../services/google';
import {getAddressFromLocation} from '../utils/locationsHelpers';

export function * COORDINATES_REQUEST({payload}) {
	const address = yield call(getAddressFromLocation, payload.data);

	return yield call(getCoordinatesFromAddress, address);
}

export function * COORDINATES_RESPONSE({response, payload}) {
	return yield all([
		put({
			type: locationsTypes.LOCATIONS_SAVE,
			payload: {
				...payload.data.toJS(),
				...response
			}
		})
	]);
}
