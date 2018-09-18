import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';
import {Card, CardActions, CardText} from 'material-ui/Card';
import {TextField, Subheader, RaisedButton} from 'material-ui';
import {bind} from 'lodash-decorators';

import {
	state,
	isLoading,
	unique,
	clickPrevent
} from '../utils/componentHelpers';
import Loader from './loader';
import CSS from '../css/modules/locationImport.css';

export default class LocationImport extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();

		this.state = {
			import: ''
		};
	}

	static propTypes = {
		status: ImmutablePropTypes.map,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	};

	static defaultProps = {
		status: Map()
	};

	@bind()
	handleChange(state) {
		return state ? this.setState(state) : null;
	}

	@bind()
	handleSubmit() {
		if (!this.state.import || this.state.import === '') {
			return;
		}

		this.props.actions.appRequest({
			payload: {
				dataset: 'locations',
				action: 'import',
				data: {
					...this.state
				}
			},
			fetch: this.fetch
		});
	}

	render() {
		const loading = isLoading(this.fetch, this.props.status);

		return (
			<div className={CSS.locationImport}>
				<div className={CSS.importWrap}>
					<form onSubmit={clickPrevent(this.handleSubmit)}>
						<Card>
							<CardText>
								<TextField
									multiLine
									fullWidth
									value={this.state.import}
									floatingLabelText="Location JSON"
									onChange={state(this.handleChange, 'import')}
								/>
							</CardText>
							<Subheader>
								To convert CSV to JSON,{' '}
								<a
									href="https://hreftools.com/csv-to-json"
									rel="noopener noreferrer"
									target="_blank"
								>
									please click here.
								</a>
							</Subheader>
							<CardActions>
								<RaisedButton
									primary
									disabled={loading}
									type="submit"
									label={loading ? null : 'Save'}
								>
									<Loader active={loading} position="center"/>
								</RaisedButton>
							</CardActions>
						</Card>
					</form>
				</div>
			</div>
		);
	}
}
