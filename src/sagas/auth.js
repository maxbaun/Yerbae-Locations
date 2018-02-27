import {eventChannel} from 'redux-saga';
import {takeEvery, fork, call, put, take} from 'redux-saga/effects';

import {types as authTypes} from '../ducks/auth';
import {types as userTypes} from '../ducks/user';
import firebase, {auth} from '../services/firebase';

const AuthProvider = new firebase.auth.GoogleAuthProvider();

export function * watchAuth() {
	yield takeEvery(authTypes.AUTH_LOGIN, onLogin);
	yield takeEvery(authTypes.AUTH_LOGOUT, onLogout);
	yield fork(onAuthState);
}

function * onLogin() {
	return yield call(login);
}

function * onLogout() {
	return yield call(logout);
}

async function login() {
	return auth.signInWithPopup(AuthProvider);
}

async function logout() {
	return auth.signOut();
}

function * onAuthState() {
	const channel = yield call(authChannel);

	while (true) {
		const {user} = yield take(channel);

		if (user) {
			yield put({
				type: userTypes.USER_SET,
				payload: user.toJSON()
			});
		} else {
			yield put({
				type: userTypes.USER_UNSET
			});
		}
	}
}

function authChannel() {
	return eventChannel(emit => {
		return firebase.auth().onAuthStateChanged(
			user => emit({user}),
			error => emit({error})
		);
	});
}
