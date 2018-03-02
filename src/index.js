// Startup point for client side application
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import {Route} from 'react-router-dom';
import qhistory from 'qhistory';
import {parse, stringify} from 'qs';

import store from './store';
import App from './containers/app';

const history = qhistory(
	createHistory(),
	stringify,
	parse
);

const s = store(history);

render(
	<Provider store={s}>
		<ConnectedRouter history={history}>
			<Route component={App}/>
		</ConnectedRouter>
	</Provider>
	,
	document.querySelector('#root')
);
