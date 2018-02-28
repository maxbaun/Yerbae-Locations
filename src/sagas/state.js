import {select, takeLatest} from 'redux-saga/effects';
import {types as stateTypes, selectors as stateSelectors} from '../ducks/state';

export function * watchState() {
	yield takeLatest(stateTypes.OFFMENU_SHOW, onOffmenuChange);
	yield takeLatest(stateTypes.OFFMENU_TOGGLE, onOffmenuChange);
	yield takeLatest(stateTypes.WINDOW_RESIZE, onWindowResize);
}

export function * onOffmenuChange({name}) {
	const offmenuState = yield select(stateSelectors.getOffmenu, name);

	const action = offmenuState ? 'add' : 'remove';
	document.querySelector('body').classList[action]('offmenu-open');
}

export function * onWindowResize({payload}) {
	return yield payload;
}
