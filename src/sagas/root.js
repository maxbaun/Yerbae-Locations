import {fork, all} from 'redux-saga/effects';

import {watchLocation} from './location';
import {watchApp} from './app';
import {watchData} from './data';

export default function * Sagas() {
	yield all([
		fork(watchApp),
		fork(watchLocation),
		fork(watchData)
	]);
}
