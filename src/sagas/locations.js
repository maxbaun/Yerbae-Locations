import {eventChannel} from 'redux-saga';
import {call, all, put, takeLatest, take, fork} from 'redux-saga/effects';
import {List, fromJS} from 'immutable';
import axios from 'axios';

import {types as locationsTypes} from '../ducks/locations';
import {types as metaTypes} from '../ducks/meta';
import {ref} from '../services/firebase';

export function * watchLocations() {
	yield takeLatest(locationsTypes.LOCATIONS_SAVE, onLocationsSave);
	yield fork(watchChildAdded);
}

export function * LOCATIONS_REQUEST({payload}) {
	if (payload.action === 'get') {
		if (!payload.data.limit) {
			payload.data.limit = 20;
		}

		const data = yield call(getLocations, payload);

		const meta = yield call(getTotalLocations, payload);

		const response = {
			data,
			meta
		};

		return yield response;
	}

	if (payload.action === 'save') {
		return yield call(onLocationsSave, fromJS(payload));
	}
}

export function * LOCATIONS_RESPONSE({response}) {
	yield all([
		put({
			type: metaTypes.LOCATIONS_META_SET,
			payload: response.meta
		}),
		put({
			type: locationsTypes.LOCATIONS_SET,
			payload: response.data
		})
	]);

	return yield response;
}

export function * onLocationsSave({payload}) {
	return yield call(updateLocation, fromJS(payload));
}

export function * watchChildAdded() {
	const channel = yield call(locationsChannel, 'child_changed');

	while (true) {
		const location = yield take(channel);

		yield put({
			type: locationsTypes.LOCATIONS_UPDATE,
			payload: transformItem(location)
		});
	}
}

function locationsChannel(evt) {
	const listener = eventChannel(emit => {
		ref().on(
			evt,
			location => emit(location)
		);

		return () => ref().off(listener);
	});

	return listener;
}

async function updateLocation(data) {
	return ref(`/${data.get('key')}`)
		.update({
			...data
				.delete('key')
				.toJS()
		});
}

async function getTotalLocations(payload) {
	let locationRef = ref();

	return axios
		.get(`${locationRef.toString()}.json?shallow=true`)
		.then(res => fromJS(res.data).keySeq().toList().map(i => parseInt(i, 10)).sort().filter(i => i >= 0))
		.then(keys => {
			const {limit, startAt} = payload.data;

			let previousPage = 0;
			let currentPage = startAt ? Math.ceil(startAt / limit) : 0;
			let nextPage = currentPage + 1;
			let totalPages = Math.ceil(keys.count() / limit);

			if (currentPage !== 0) {
				previousPage = currentPage - 1;
			}

			if (currentPage === totalPages || nextPage > totalPages) {
				nextPage = currentPage;
			}

			let pages = List();

			for (let x = 0; x < totalPages; x++) {
				const start = limit * x;
				pages = pages.push(keys.slice(start, start + limit));
			}

			const nextKey = pages.get(nextPage) ? pages.get(nextPage).first() : null;
			const prevKey = currentPage > 0 ? pages.get(previousPage).first() : null;
			const currentKey = pages.get(currentPage).first();

			return fromJS({
				previousPage,
				currentPage,
				nextPage,
				totalPages,
				prevKey,
				nextKey,
				currentKey
			});
		});
}

async function getLocations(payload) {
	let locationRef = ref();

	if (payload.data.orderBy) {
		locationRef = locationRef.orderByChild(payload.data.orderBy);
	} else {
		locationRef = locationRef.orderByKey();
	}

	if (payload.data.limit) {
		locationRef = locationRef.limitToFirst(payload.data.limit);
	}

	if (payload.data.startAt) {
		locationRef = locationRef.startAt(`${payload.data.startAt}`);
	}

	return new Promise(resolve => {
		locationRef
			.once('value', snapshot => {
				let items = List();
				snapshot.forEach(s => {
					items = items.push(transformItem(s));
				});

				return resolve(items);
			});
	});
}

function transformItem(item) {
	return fromJS({
		...item.val(),
		key: item.key
	});
}
