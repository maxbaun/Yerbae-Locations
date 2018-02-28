import {Cookies} from 'react-cookie';
import Base64 from 'Base64';
import {fromJS} from 'immutable';

import {token, url} from '../constants';

const Cookie = new Cookies();

export function tokenGet(c = 'user') {
	let t = token[c];

	return Cookie.get(t) || null;
}

export function tokenSet(data, c = 'user') {
	let n = token[c];

	Cookie.set(n, data, {domain: url.cookieDomain, path: '/'});
}

export function tokenRemove(c = 'user') {
	let n = token[c];

	Cookie.remove(n, {domain: url.cookieDomain, path: '/'});
}

export function tokenParse(c = 'user') {
	let t = tokenGet(c);

	if (!t) {
		return null;
	}

	let payload = t.split('.');

	if (payload.length !== 3 || typeof payload[1] === 'undefined') {
		return null;
	}

	let data = JSON.parse(Base64.atob(payload[1]));

	return fromJS(data);
}
