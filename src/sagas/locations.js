import {call, all, put} from 'redux-saga/effects';
import firebase from 'firebase';
import {List, fromJS} from 'immutable';
import axios from 'axios';

import {types as locationsTypes} from '../ducks/locations';
import {types as metaTypes} from '../ducks/meta';

/* eslint-disable */
const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	databaseURL: FIREBASE_DATABASE_URL,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
};
/* eslint-enable */

firebase.initializeApp(firebaseConfig);

export function * LOCATIONS_REQUEST({payload}) {
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

async function getTotalLocations(payload) {
	let locationRef = firebase.database().ref('/');

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
	let locationRef = firebase.database().ref('/');

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
