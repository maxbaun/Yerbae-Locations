import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bind} from 'lodash-decorators';
import {Map, List} from 'immutable';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import {RaisedButton} from 'material-ui';
import {Link} from 'react-router-dom';

import {noop, coordinates, isLoading, unique} from '../utils/componentHelpers';
import CSS from '../css/modules/locationRow.css';

export default class LocationRow extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		data: ImmutablePropTypes.map,
		actions: PropTypes.objectOf(PropTypes.func),
		children: PropTypes.array.isRequired,
		status: ImmutablePropTypes.map
	}

	static defaultProps = {
		data: Map(),
		status: Map(),
		actions: {noop}
	}

	@bind()
	handleDelete() {
		this.props.actions.appRequest({
			payload: {
				dataset: 'locations',
				action: 'delete',
				data: {
					id: this.props.data.get('_id')
				}
			},
			fetch: this.fetch
		});
	}

	render() {
		const {data: location, status, ...rowProps} = this.props;
		const loading = isLoading(this.fetch, status);

		return (
			<TableRow {...rowProps}>
				{this.props.children[0]}
				<TableRowColumn>{location.get('name')}</TableRowColumn>
				<TableRowColumn>{location.get('address')}</TableRowColumn>
				<TableRowColumn>{location.get('city')}</TableRowColumn>
				<TableRowColumn>{location.get('state')}</TableRowColumn>
				<TableRowColumn>{location.get('zip')}</TableRowColumn>
				<TableRowColumn>
					<span className={CSS.coordinates}>{coordinates(location)}</span>
				</TableRowColumn>
				<TableRowColumn>
					<div className={CSS.buttons}>
						<Link to={`/locations/${location.get('_id')}`}>
							<RaisedButton disabled={loading} label="Edit"/>
						</Link>
						<RaisedButton disabled={loading} secondary label="Delete" onClick={this.handleDelete}/>
					</div>
				</TableRowColumn>
			</TableRow>
		);
	}
}
