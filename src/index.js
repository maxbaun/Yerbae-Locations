// Startup point for client side application
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import createHistory from 'history/createBrowserHistory';

import store from './store';
import routes from './routes';

const history = createHistory();
const s = store(history);

render(
	<Provider store={s}>
		<Router history={history}>
			{renderRoutes(routes)}
		</Router>
	</Provider>
	,
	document.querySelector('#root')
);
