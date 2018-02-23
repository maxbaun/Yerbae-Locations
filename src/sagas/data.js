import {takeEvery} from 'redux-saga/effects';

import {types as dataTypes} from '../ducks/data';

export function * watchData() {
	yield takeEvery(dataTypes.DATA_SET, onDataSet);
}

function * onDataSet({payload}) {
	console.log('The data was set', payload);

	return yield payload;
}
