import {fork, all} from 'redux-saga/effects';

import {watchLocation} from './location';
import {watchApp} from './app';
import {watchData} from './data';
import {watchLocations} from './locations';
import {watchAuth} from './auth';
import {watchState} from './state';

export default function * Sagas() {
	yield all([
		fork(watchApp),
		fork(watchLocation),
		fork(watchData),
		fork(watchLocations),
		fork(watchAuth),
		fork(watchState)
	]);
}
