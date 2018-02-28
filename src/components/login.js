import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {TextField, RaisedButton} from 'material-ui';
import {bind} from 'lodash-decorators';
import {Map} from 'immutable';

import CSS from '../css/modules/login.css';
import {state, clickPrevent, unique, isLoading} from '../utils/componentHelpers';
import {checkLoggedOut} from '../utils/routeHelpers';
import Loader from './loader';
import Logo from '../img/logo.png';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		history: PropTypes.object.isRequired,
		status: ImmutablePropTypes.map
	};

	static defaultProps = {
		status: Map()
	}

	componentWillMount() {
		checkLoggedOut(this.props.history);
	}

	@bind()
	handleChange(state) {
		return state ? this.setState(state) : null;
	}

	@bind()
	handleLogin() {
		if (this.formValid()) {
			this.props.actions.appRequest({
				payload: {
					dataset: 'auth',
					action: 'login',
					reload: true,
					data: this.state
				},
				fetch: this.fetch
			});
		}
	}

	formValid() {
		const {email, password} = this.state;
		return email && password && email !== '' && password !== '';
	}

	render() {
		const loading = isLoading(this.fetch, this.props.status);
		return (
			<div className={CSS.login}>
				<div className={CSS.logo}>
					<img src={Logo} alt="Yerbae Logo"/>
				</div>
				<form onSubmit={clickPrevent(this.handleLogin)}>
					<ul className={CSS.form}>
						<li>
							<TextField
								fullWidth
								hintText="Your email address"
								floatingLabelText="Email"
								type="email"
								onChange={state(this.handleChange, 'email')}
							/>
						</li>
						<li>
							<TextField
								fullWidth
								hintText="Your password"
								floatingLabelText="Password"
								type="password"
								onChange={state(this.handleChange, 'password')}
							/>
						</li>
						<li>
							<RaisedButton primary disabled={loading} type="submit" label={loading ? null : 'Login'}>
								<Loader active={loading} position="center"/>
							</RaisedButton>
						</li>
					</ul>
				</form>
			</div>
		);
	}
}
