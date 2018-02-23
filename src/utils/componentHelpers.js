import uuid from 'uuid/v4';

export function unique() {
	return uuid();
}

export function noop() {}
