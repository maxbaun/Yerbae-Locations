import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Switch} from 'react-router-dom';
import {Map} from 'immutable';
import {bind} from 'lodash-decorators';

import {actions as locationActions, selectors as locationSelectors} from '../ducks/location';
import {actions as storeActions, selectors as storeSelectors} from '../ducks/app';
import {actions as dataActions, selectors as dataSelectors} from '../ducks/data';
import {actions as authActions} from '../ducks/auth';
import {selectors as locationsSelectors} from '../ducks/locations';
import {actions as stateActions, selectors as stateSelectors} from '../ducks/state';
import {selectors as userSelectors} from '../ducks/user';
import {selectors as metaSelectors} from '../ducks/meta';
import {MuiThemeProvider} from 'material-ui/styles';

import {unique, click} from '../utils/componentHelpers';
import {isLoggedIn} from '../utils/userHelpers';
import Header from '../components/header';
import Menu from '../components/menu';

import routes from '../routes';

import '../css/utils/global.css';

const mapStateToProps = state => ({
	location: locationSelectors.getLocation(state),
	status: storeSelectors.getStatus(state),
	data: dataSelectors.getData(state),
	locations: locationsSelectors.getLocations(state),
	meta: metaSelectors.getMeta(state),
	user: userSelectors.getUser(state),
	state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		...locationActions,
		...storeActions,
		...dataActions,
		...authActions,
		...stateActions
	}, dispatch)
});

class App extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		data: ImmutablePropTypes.map,
		user: ImmutablePropTypes.map,
		state: ImmutablePropTypes.map
	};

	static defaultProps = {
		data: Map(),
		user: Map(),
		state: Map()
	};

	render() {
		const {user, actions, state} = this.props;
		const isLogged = isLoggedIn(user);

		return (
			<div id="app">
				<MuiThemeProvider>
					{isLogged ?
						<Header
							actions={actions}
						/> : null
					}
					{isLogged ?
						<Menu
							active={state.getIn(['offmenu', 'menu'])}
							actions={actions}
						/> : null
					}
					<BrowserRouter>
						{renderRoutes(routes, {...this.props})}
					</BrowserRouter>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
