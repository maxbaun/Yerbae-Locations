export function isLoggedIn(user) {
	return user ? Boolean(user.get('uid')) : false;
}

export function isLoggedOut(user) {
	return !user || user.isEmpty();
}
