import App from './containers/app';
import Locations from './components/locations';
import LocationNew from './components/locationNew';
import LocationEdit from './components/locationEdit';
import LocationImport from './components/locationImport';
import Login from './components/login';
import About from './components/about';
import NotFound from './components/404';

export default [
	{
		path: '/',
		exact: true,
		component: Login
	},
	{
		path: '/locations',
		exact: true,
		component: Locations
	},
	{
		path: '/locations/new',
		exact: true,
		component: LocationNew
	},
	{
		path: '/locations/import',
		exact: true,
		component: LocationImport
	},
	{
		path: '/locations/:locationId',
		component: LocationEdit
	},
	{
		path: '*',
		component: NotFound
	}
];
