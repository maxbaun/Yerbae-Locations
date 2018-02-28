import {Component} from 'react';
import PropTypes from 'prop-types';

export default class NotFound extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired
	}

	componentDidMount() {
		this.props.history.replace({pathname: '/'});
	}

	render() {
		return null;
	}
}
