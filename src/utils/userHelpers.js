export function isLoggedIn(user) {
	return user ? Boolean(user.get('_id')) : false;
}

export function isLoggedOut(user) {
	return !user || user.isEmpty();
}
