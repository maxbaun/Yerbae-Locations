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

export default class LocationEdit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: Map()
		};

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

	componentDidMount() {
		const location = currentLocation(this.props.locations, this.props.match);

		if (location.isEmpty()) {
			return this.getLocation({});
		}

		this.setState({location});
	}

	componentWillReceiveProps(nextProps) {
		const oldLocation = currentLocation(this.props.locations, this.props.match);
		const location = currentLocation(nextProps.locations, nextProps.match);

		if (!location.isEmpty() && !location.equals(oldLocation)) {
			this.setState({location});
		}
	}

	getLocation() {
		this.props.actions.appRequest({
			payload: {
				dataset: 'locations',
				action: 'get',
				data: {
					id: this.props.match.params.locationId
				}
			},
			fetch: this.fetch
		});
	}

	transformLocationForUpdate(location) {
		return fromJS({
			name: location.get('name') || '',
			address: location.get('address') || '',
			city: location.get('city') || '',
			state: location.get('state') || '',
			zip: location.get('zip') || ''
		});
	}

	@bind()
	handleSubmit(location) {
		this.props.actions.appRequest({
			payload: {
				dataset: 'locations',
				action: 'save',
				params: {
					id: this.props.match.params.locationId
				},
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
			<div className={CSS.locationEdit}>
				<Location
					location={this.state.location}
					loading={loading}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}
