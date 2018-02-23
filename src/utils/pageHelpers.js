import {fromJS} from 'immutable';

export function getHero(page) {
	let images = page.get('heroImages');

	if (images) {
		images = images.map(i => {
			return fromJS({
				url: i.getIn(['heroImage', 'url']), // Full size image
				title: i.getIn(['heroImage', 'title'])
			});
		});
	}

	return fromJS({
		images,
		title: page.get('heroTitle'),
		link: page.get('heroLink'),
		color: page.get('pageColor')
	});
}
