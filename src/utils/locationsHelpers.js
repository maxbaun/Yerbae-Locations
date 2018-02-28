import {Map} from 'immutable';

export function getAddressFromLocation(location) {
	return `${location.get('address')}, ${location.get('city')}, ${location.get('state')} ${location.get('zip')}`;
}

export function currentLocation(locations, match) {
	const location = locations.find(l => l.get('_id') === match.params.locationId);

	return location ? location : Map();
}
