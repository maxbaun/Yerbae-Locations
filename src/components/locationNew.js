import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {TextField, RaisedButton} from 'material-ui';
import {bind} from 'lodash-decorators';
import {Map, List, fromJS} from 'immutable';

import CSS from '../css/modules/location.css';
import {state, clickPrevent, unique, isLoading, coordinates} from '../utils/componentHelpers';
import {currentLocation} from '../utils/locationsHelpers';
import {checkAuth} from '../utils/routeHelpers';
import Loader from './loader';
import Location from './location';

export default class LocationNew extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		history: PropTypes.object.isRequired,
		status: ImmutablePropTypes.map,
		match: PropTypes.object.isRequired,
		locations: ImmutablePropTypes.list
	};

	static defaultProps = {
		status: Map(),
		locations: List()
	}

	componentWillMount() {
		checkAuth(this.props.history);
	}

	@bind()
	handleSubmit(location) {
		this.props.actions.appRequest({
			payload: {
				dataset: 'locations',
				action: 'create',
				data: {
					...location
				}
			},
			fetch: this.fetch
		});
	}

	render() {
		const loading = isLoading(this.fetch, this.props.status);

		return (
			<div className={CSS.locationNew}>
				<Location
					location={Map()}
					loading={loading}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}
