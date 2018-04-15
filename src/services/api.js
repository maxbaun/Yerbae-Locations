import axios from 'axios';
import {api} from './../constants';
import {tokenGet} from '../services/token';

export default function ({method, data, route}) {
	let token = tokenGet();

	let request = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method,
		data,
		baseURL: api,
		url: parseUrl(route)
	};

	if (token) {
		request.headers.Authorization = token;
	}

	if (Array.isArray(request.data)) {
		return makeApiCallInBatches(request);
	}

	return makeApiCall(request);
}

function parseUrl(route) {
	let url = route;

	return url;
}

async function makeApiCallInBatches(request) {
	let tempArray = [];
	const chunk = 50;

	for (let i = 0; i < request.data.length; i += chunk) {
		tempArray.push(request.data.slice(i, i + chunk));
	}

	let data = [];

	await asyncForEach(tempArray, async data => {
		let res = await makeApiCall({
			...request,
			data
		});

		data.push(res.data);
	});

	return {
		success: true,
		data
	};
}

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array); //eslint-disable-line
	}
}

async function makeApiCall(request) {
	let data;

	if (Array.isArray(request.data)) {
		data = [...request.data];
	} else {
		data = Object.assign({}, request.data);
	}

	if (data) {
		request.data = JSON.stringify(data);
	}

	if (request.method === 'get') {
		request.params = data;
	}

	return axios(request)
		.then(res => res.data);
}
