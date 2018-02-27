import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';
import {Map, List} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {noop, unique, click} from '../utils/componentHelpers';

class Home extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		data: ImmutablePropTypes.map,
		locations: ImmutablePropTypes.list,
		meta: ImmutablePropTypes.map,
		location: ImmutablePropTypes.map,
		user: ImmutablePropTypes.map
	};

	static defaultProps = {
		actions: {noop},
		data: Map(),
		locations: List(),
		location: Map(),
		meta: Map(),
		user: Map()
	};

	componentDidMount() {
		this.getLocations({});
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.location.equals(this.props.location)) {
			this.getLocations({
				startAt: nextProps.location.getIn(['query', 'startAt'])
			});
		}
	}

	getLocations({startAt = this.props.location.getIn(['query', 'startAt'])}) {
		this.props.actions.appRequest({
			payload: {
				dataset: 'locations',
				action: 'get',
				data: {
					startAt
				}
			},
			fetch: this.fetch
		});
	}

	@bind()
	handleGetCoords(location) {
		this.props.actions.appRequest({
			payload: {
				dataset: 'coordinates',
				data: location
			},
			fetch: this.fetch
		});
	}

	@bind()
	handlePageClick(startAt) {
		this.props.actions.locationQuery({
			query: {
				startAt
			}
		});
	}

	@bind()
	handleLogin() {
		this.props.actions.authLogin();
	}

	@bind()
	handleLocationSave(e) {
		console.log(e.target.values);
		e.preventDefault();
	}

	render() {
		const {data, locations, meta} = this.props;

		const prev = meta.getIn(['locations', 'prevKey']);
		const next = meta.getIn(['locations', 'nextKey']);

		return (
			<div>
				<h1>Data title: {data.get('title')}</h1>
				This is the home page
				{locations.map(location => {
					return (
						<div key={location.get('key')}>
							<form onSubmit={this.handleLocationSave}>
								<input type="text" defaultValue={location.get('name')}/>
								<strong>{location.get('lat')} / {location.get('lng')}</strong>
								<button type="button" onClick={click(this.handleGetCoords, location)}>Get Coords</button>

							</form>
						</div>
					);
				})}
				{prev !== null && prev >= 0 ? <button type="button" onClick={click(this.handlePageClick, prev)}>Prev</button> : null}
				{next ? <button type="button" onClick={click(this.handlePageClick, next)}>Next</button> : null}
			</div>
		);
	}
}

export default Home;
