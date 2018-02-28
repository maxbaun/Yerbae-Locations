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

export default class Location extends Component {
	constructor(props) {
		super(props);

		this.state = {
			old: Map(),
			update: fromJS({
				name: '',
				address: '',
				city: '',
				state: '',
				zip: ''
			})
		};

		this.fetch = unique();
	}

	static propTypes = {
		location: ImmutablePropTypes.map,
		loading: PropTypes.bool,
		onSubmit: PropTypes.func.isRequired
	};

	static defaultProps = {
		location: Map(),
		loading: false
	}

	componentDidMount() {
		this.setLocationState(this.props.location);
	}

	componentWillReceiveProps(nextProps) {
		const oldLocation = this.props.location;
		const location = nextProps.location;

		if (!location.isEmpty() && !location.equals(oldLocation)) {
			this.setLocationState(location);
		}
	}

	setLocationState(location) {
		this.setState({
			old: location,
			update: this.transformLocationForUpdate(location)
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
	handleChange(state) {
		let update = this.state.update.update(u => u.merge(state));

		return state ? this.updateState(update) : null;
	}

	updateState(update) {
		return this.setState({update});
	}

	@bind()
	handleSubmit() {
		return this.props.onSubmit(this.state.update.toJS());
	}

	render() {
		const {update: location, old: oldLocation, loading} = this.state;

		return (
			<div className={CSS.location}>
				<form onSubmit={clickPrevent(this.props.onSubmit, this.state.update.toJS())}>
					<ul className={CSS.form}>
						<li>
							<TextField
								fullWidth
								value={location.get('name')}
								floatingLabelText="Name"
								type="text"
								onChange={state(this.handleChange, 'name')}
							/>
						</li>
						<li>
							<TextField
								fullWidth
								value={location.get('address')}
								floatingLabelText="Address"
								type="text"
								onChange={state(this.handleChange, 'address')}
							/>
						</li>
						<li>
							<TextField
								fullWidth
								value={location.get('city')}
								floatingLabelText="City"
								type="text"
								onChange={state(this.handleChange, 'city')}
							/>
						</li>
						<li>
							<TextField
								fullWidth
								value={location.get('state')}
								floatingLabelText="State"
								type="text"
								onChange={state(this.handleChange, 'state')}
							/>
						</li>
						<li>
							<TextField
								fullWidth
								value={location.get('zip')}
								floatingLabelText="Zip"
								type="text"
								onChange={state(this.handleChange, 'zip')}
							/>
						</li>
						{oldLocation.get('_id') ?
							<li>
								<TextField
									fullWidth
									disabled
									value={coordinates(oldLocation)}
									floatingLabelText="Coordinates"
									type="text"
								/>
							</li> : null
						}
						<li>
							<RaisedButton primary disabled={loading} type="submit" label={loading ? null : 'Save'}>
								<Loader active={loading} position="center"/>
							</RaisedButton>
						</li>
					</ul>
				</form>
			</div>
		);
	}
}
