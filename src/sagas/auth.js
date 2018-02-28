import {takeEvery, takeLatest, call, put} from 'redux-saga/effects';

import {types as authTypes} from '../ducks/auth';
import {types as userTypes} from '../ducks/user';
import {tokenSet, tokenParse, tokenRemove} from '../services/token';
import {onReload, onNewLocation} from '../sagas/location';

export function * watchAuth() {
	yield takeEvery(authTypes.AUTH_LOGIN, onLogin);
	yield takeEvery(authTypes.AUTH_LOGOUT, onLogout);
	yield takeLatest(authTypes.AUTH_RESPONSE, onResponse);
}

function * onLogin({payload}) {
	payload.method = 'put';

	if (!payload.route) {
		payload.route = 'v1/public/auth';
	}

	return yield payload;
}

function * onLogout() {
	yield call(tokenRemove, 'user');

	yield put({
		type: userTypes.USER_UNSET
	});

	return yield call(onNewLocation, `/`);
}

function * onResponse({response, payload}) {
	if (response && response.data && response.data.token) {
		const reload = payload && typeof payload.reload !== 'undefined' ? payload.reload : true;

		yield call(tokenSet, response.data.token);

		const token = yield call(tokenParse);

		yield put({
			type: userTypes.USER_SET,
			payload: token
		});

		if (reload) {
			return yield call(onReload);
		}
	}

	return yield response;
}
