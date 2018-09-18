import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import {isLoading, unique} from '../utils/componentHelpers';
import {checkAuth} from '../utils/routeHelpers';
import Loader from './loader';
import CSS from '../css/modules/locationExport.css';

export default class LocationExport extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		history: PropTypes.object.isRequired,
		status: PropTypes.object.isRequired,
		files: ImmutablePropTypes.map
	};

	static defaultProps = {
		files: Map()
	};

	componentWillMount() {
		checkAuth(this.props.history);
	}

	componentDidMount() {
		this.props.actions.appRequest({
			fetch: this.fetch,
			payload: {
				dataset: 'locations',
				action: 'export'
			}
		});
	}

	render() {
		const {files} = this.props;
		const loading = isLoading(this.fetch, this.props.status);

		return (
			<div className={CSS.locationExport}>
				<div className={CSS.exportWrap}>
					{loading ? (
						<Loader active={loading} position="center"/>
					) : (
						<a href={files.get('export')} target="_blank">
							{files.get('export')}
						</a>
					)}
				</div>
			</div>
		);
	}
}
