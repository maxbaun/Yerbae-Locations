import {call, select, takeLatest, put} from 'redux-saga/effects';
import {push, goBack} from 'react-router-redux';
import {supportsHistory} from 'history/DOMUtils';

import {types, selectors as locationSelectors} from '../ducks/location';

export function * watchLocation() {
	yield takeLatest(types.LOCATION_PUSH, onPush);
	yield takeLatest(types.LOCATION_BACK, onBack);
	yield takeLatest(types.LEGACY_LOCATION_CHANGE, legacyLocationChange);
	yield takeLatest(types.LOCATION_CHANGE, onLocationChange);
	yield takeLatest(types.LOCATION_QUERY, onLocationQuery);
}

export function * onLocationChange({payload}) {
	const {pathname, query} = payload;

	if (query && query.token) {
		yield call(onNewLocation, pathname);
	}
}

export function * onLocationQuery({query}) {
	const location = yield select(locationSelectors.getLocation);
	const pathname = location.get('pathname');

	if (supportsHistory()) {
		return yield call(push, {pathname, query});
	}

	return yield call(legacyLocationChange, {pathname, query});
}

export function * onPush(action) {
	const {pathname, state} = action.payload;

	return yield put(push({
		pathname,
		state
	}));
}

export function * onBack() {
	if (supportsHistory()) {
		return yield call(goBack);
	}

	return yield call(legacyLocationChange, {pathname: '/'});
}

export function * legacyLocationChange(data) {
	const {pathname, query} = data;
	let url = getBaseUrl() + pathname;

	if (query && (query.page || query.filter)) {
		for (let key in query) {
			if ({}.hasOwnProperty.call(query, key)) {
				url += `${key}=${JSON.stringify(query[key])}&`;
			}
		}

		url = url.slice(0, -1);
	}

	if (window.location.href !== url) {
		yield window.location.href = url;
	}
}

export function * onReload() {
	return yield window.location.reload();
}

export function * onNewLocation(location) {
	window.location = location;
	return yield window.location;
}

function getBaseUrl() {
	return `${window.location.protocol}//${window.location.host}`;
}
