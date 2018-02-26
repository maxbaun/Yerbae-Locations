import {call, put, all, takeEvery} from 'redux-saga/effects';

import {types as appTypes} from '../ducks/app';
import {sagaResponse, sagaRequest, sagaFailure} from '../utils/sagaHelpers';
import {errorHandler} from '../utils/errorHelpers';

export function * watchApp() {
	yield takeEvery(appTypes.APP_REQUEST, onRequest);
}

function * onRequest({payload, fetch, notification, tracking, redirect}) {
	try {
		// Run pre-request saga functions here
		let response = yield call(sagaRequest(payload.dataset), {payload});

		// Remove any empty/undefined payloads
		// payload = payload.filter(p => p);

		// Run the response saga functions hers
		response = yield call(sagaResponse(payload.dataset), {response, payload});

		return yield call(onSuccess, {response, fetch, notification, tracking, redirect});
	} catch (error) {
		return yield call(onFailure, {payload, error, fetch, redirect});
	}
}

export function * onSuccess({response, fetch, notification, tracking, redirect}) {
	yield put({
		type: appTypes.APP_SUCCESS,
		payload: response,
		fetch
	});

	return response;
}

export function * onFailure({payload, error, fetch}) {
	console.log('*********APP ERROR********');
	console.error(error);
	console.log('****************************');

	yield put({
		type: appTypes.APP_FAILURE,
		payload: errorHandler(error),
		fetch
	});

	// Run the response saga functions hers
	yield all(sagaFailure(payload.dataset), {error, payload});

	return yield error;
}
