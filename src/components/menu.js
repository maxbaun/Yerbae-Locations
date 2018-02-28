import React from 'react';
import PropTypes from 'prop-types';
import {Drawer, MenuItem} from 'material-ui';
import {Link} from 'react-router-dom';

import {noop, click} from '../utils/componentHelpers';
import CSS from '../css/modules/menu.css';

const Menu = ({active, actions}) => {
	const toggleMenu = click(actions.offmenuToggle, 'menu');
	return (
		<Drawer docked={false} open={active} onRequestChange={click(actions.offmenuToggle, 'menu')}>
			<Link className={CSS.link} to="/locations">
				<MenuItem onClick={toggleMenu}>
					Home
				</MenuItem>
			</Link>
			<Link className={CSS.link} to="/locations/new">
				<MenuItem onClick={toggleMenu}>
					New Location
				</MenuItem>
			</Link>
			<Link className={CSS.link} to="/locations/import">
				<MenuItem onClick={toggleMenu}>
					Import Locations
				</MenuItem>
			</Link>
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
