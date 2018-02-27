import GoogleMaps from '@google/maps';

const googleMapsClient = GoogleMaps.createClient({
	key: GOOGLE_MAPS_KEY //eslint-disable-line
});

export async function getCoordinatesFromAddress(address) {
	return new Promise((resolve, reject) => {
		googleMapsClient.geocode({address}, (err, res) => {
			if (err) {
				return reject(err);
			}

			let result = res.json.results[0] || {};

			let data = {
				lat: result.geometry.location.lat,
				lng: result.geometry.location.lng,
				googleId: result.place_id
			};

			return resolve(data);
		});
	});
}
