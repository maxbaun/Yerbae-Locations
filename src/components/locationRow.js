import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bind} from 'lodash-decorators';
import {Map, List} from 'immutable';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import {RaisedButton} from 'material-ui';
import {Link} from 'react-router-dom';

import {noop, coordinates} from '../utils/componentHelpers';
import CSS from '../css/modules/locationRow.css';

export default class LocationRow extends Component {
	static propTypes = {
		data: ImmutablePropTypes.map,
		actions: PropTypes.objectOf(PropTypes.func),
		children: PropTypes.array.isRequired
	}

	static defaultProps = {
		data: Map(),
		actions: {noop}
	}

	render() {
		const {data: location, ...rowProps} = this.props;

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
					<Link to={`/locations/${location.get('_id')}`}>
						<RaisedButton secondary label="Edit"/>
					</Link>
				</TableRowColumn>
			</TableRow>
		);
	}
}
