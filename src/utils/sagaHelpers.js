export function sagaResponse(dataset) {
	return require(`../sagas/${dataset}`)[`${dataset.toUpperCase()}_RESPONSE`];
}

export function sagaRequest(dataset) {
	return require(`../sagas/${dataset}`)[`${dataset.toUpperCase()}_REQUEST`];
}

export function sagaFailure(dataset) {
	const func = require(`../sagas/${dataset}`)[`${dataset.toUpperCase()}_FAILURE`];
	return func ? func : () => {};
}
