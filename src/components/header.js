import React from 'react';
import PropTypes from 'prop-types';
import {AppBar} from 'material-ui';

import {noop, click} from '../utils/componentHelpers';
import CSS from '../css/modules/header.css';

const Header = ({actions}) => {
	return (
		<header className={CSS.header}>
			<AppBar
				showMenuIconButton
				title="Yerbae Locations"
				onLeftIconButtonClick={click(actions.offmenuToggle, 'menu')}
			/>
		</header>
	);
};

Header.propTypes = {
	actions: PropTypes.objectOf(PropTypes.func)
};

Header.defaultProps = {
	actions: {noop}
};

export default Header;
