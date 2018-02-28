import {tokenGet} from '../services/token';

export function checkAuth(history) {
	if (!tokenGet()) {
		return history.replace({pathname: '/'});
	}
}

export function checkLoggedOut(history) {
	if (tokenGet()) {
		return history.replace({pathname: '/locations'});
	}
}
