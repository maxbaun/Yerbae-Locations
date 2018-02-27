export function getAddressFromLocation(location) {
	return `${location.get('address')}, ${location.get('city')}, ${location.get('state')} ${location.get('zip')}`;
}
