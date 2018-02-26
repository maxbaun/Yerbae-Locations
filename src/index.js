// Startup point for client side application
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import qhistory from 'qhistory';
import {parse, stringify} from 'qs';

import store from './store';
import routes from './routes';

const history = qhistory(
	createHistory(),
	stringify,
	parse
);

const s = store(history);

render(
	<Provider store={s}>
		<ConnectedRouter history={history}>
			{renderRoutes(routes)}
		</ConnectedRouter>
	</Provider>
	,
	document.querySelector('#root')
);
