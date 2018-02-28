import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bind} from 'lodash-decorators';
import {Map, List} from 'immutable';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {noop, unique, click, state, coordinates} from '../utils/componentHelpers';
import {checkAuth} from '../utils/routeHelpers';
import CSS from '../css/modules/locations.css';
import LocationRow from './locationRow';

export default class Locations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			import: ''
		};

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		data: ImmutablePropTypes.map,
		locations: ImmutablePropTypes.list,
		meta: ImmutablePropTypes.map,
		location: ImmutablePropTypes.map,
		user: ImmutablePropTypes.map,
		history: PropTypes.object.isRequired
	};

	static defaultProps = {
		actions: {noop},
		data: Map(),
		locations: List(),
		location: Map(),
		meta: Map(),
		user: Map()
	};

	componentWillMount() {
		checkAuth(this.props.history);
	}

	componentDidMount() {
		this.getLocations({});
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.location.equals(this.props.location)) {
			this.getLocations({
				page: nextProps.location.getIn(['query', 'page'])
			});
		}
	}

	getLocations({page = this.props.location.getIn(['query', 'page'])}) {
		this.props.actions.appRequest({
			payload: {
				dataset: 'locations',
				action: 'get',
				data: {
					page
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
	handlePageClick(page) {
		this.props.actions.locationQuery({
			query: {
				page
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

	@bind()
	handleChange(state) {
		console.log(state);
		return state ? this.setState(state) : null;
	}

	@bind()
	handleImportSubmit(e) {
		e.preventDefault();

		this.props.actions.appRequest({
			payload: {
				dataset: 'locations',
				action: 'create',
				data: this.state.import
			},
			fetch: this.fetch
		});
	}

	render() {
		const {data, locations, meta, actions} = this.props;

		const prev = meta.getIn(['locations', 'prevKey']);
		const next = meta.getIn(['locations', 'nextKey']);

		return (
			<div className={CSS.locations}>
				<Table selectable={false}>
					<TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Address</TableHeaderColumn>
							<TableHeaderColumn>City</TableHeaderColumn>
							<TableHeaderColumn>State</TableHeaderColumn>
							<TableHeaderColumn>Zip</TableHeaderColumn>
							<TableHeaderColumn>Coordinates</TableHeaderColumn>
							<TableHeaderColumn>Actions</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{locations.map(location => {
							return (
								<LocationRow
									key={location.get('_id')}
									data={location}
									actions={actions}
								/>
							);
						})}
					</TableBody>
				</Table>
			</div>
		);
	}
}
