import axios from 'axios';
import {api} from './../constants';
import {tokenGet} from '../services/token';

export default function ({method, params, data, route}) {
	let token = tokenGet();

	let request = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method,
		baseURL: api,
		url: parseUrl(route)
	};

	if (token) {
		request.headers.Authorization = token;
	}

	if (data) {
		request.data = JSON.stringify(data);
	}

	if (method === 'get') {
		request.params = data;
	}

	return axios(request)
		.then(res => res.data);
}

function parseUrl(route) {
	let url = route;

	return url;
}
