export function sagaAction(payload, data) {
	const {action, dataset} = payload;

	return {
		type: `${dataset.toUpperCase()}_${action.toUpperCase()}`,
		...data
	};
}

export function sagaResponse(payload, data) {
	const {dataset} = payload;

	return {
		type: `${dataset.toUpperCase()}_RESPONSE`,
		...data
	};
}

export function sagaFailure(payload, data) {
	const {dataset} = payload;

	return {
		type: `${dataset.toUpperCase()}_FAILURE`,
		...data
	};
}
