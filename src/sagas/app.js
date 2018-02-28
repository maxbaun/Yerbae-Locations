import {call, put, all, takeEvery} from 'redux-saga/effects';

import {types as appTypes} from '../ducks/app';
import {sagaResponse, sagaAction, sagaFailure} from '../utils/sagaHelpers';
import {errorHandler} from '../utils/errorHelpers';
import api from '../services/api';

export function * watchApp() {
	yield takeEvery(appTypes.APP_REQUEST, onRequest);
}

function * onRequest({payload, fetch, notification, tracking, redirect}) {
	try {
		// Run pre-request saga functions here
		let action = yield put(sagaAction(payload, {payload}));

		// Remove any empty/undefined payloads
		// payload = payload.filter(p => p);

		let response = yield call(api, action.payload);

		// Run the response saga functions hers
		response = yield put(sagaResponse(action.payload, {response, payload: action.payload}));

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
	yield put(sagaFailure(payload, {error, payload}));

	return yield error;
}
