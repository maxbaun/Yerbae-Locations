import React from 'react';
import PropTypes from 'prop-types';
import {Drawer, MenuItem} from 'material-ui';

import {noop, click} from '../utils/componentHelpers';
import CSS from '../css/modules/menu.css';

const Menu = ({active, actions}) => {
	return (
		<Drawer docked={false} open={active} onRequestChange={click(actions.offmenuToggle, 'menu')}>
			<MenuItem onClick={click(actions.locationPush, {pathname: '/locations'})}>
				Home
			</MenuItem>
			<MenuItem onClick={click(actions.locationPush, {pathname: '/locations/new'})}>
				New Location
			</MenuItem>
			<MenuItem onClick={click(actions.locationPush, {pathname: '/locations/import'})}>
				Import Locations
			</MenuItem>
		</Drawer>
	);
};

Menu.propTypes = {
	active: PropTypes.bool,
	actions: PropTypes.objectOf(PropTypes.func)
};

Menu.defaultProps = {
	active: false,
	actions: {noop}
};

export default Menu;
