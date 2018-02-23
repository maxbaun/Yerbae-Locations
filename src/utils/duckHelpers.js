import Immutable from 'immutable';

export function initialState(data) {
	return Immutable.fromJS(data);
}

export function action(type, payload = {}) {
	return {type, ...payload};
}

export function requestTypes(base) {
	const REQUEST = 'REQUEST';
	const SUCCESS = 'SUCCESS';
	const FAILURE = 'FAILURE';

	return [REQUEST, SUCCESS, FAILURE].reduce((action, type) => {
		const baseType = `${base}_${type}`;

		action[baseType] = baseType;

		return action;
	}, {});
}

export function compileData(root, id, props) {
	// Put the data together with specified props
	return root.get(id)
		.withMutations(data => {
			props.reduce((d, p) => d.set(p, root.get(d.get(p))), data);
		});
}
