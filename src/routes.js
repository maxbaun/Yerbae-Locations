import App from './containers/app';
import Locations from './components/locations';
import LocationNew from './components/locationNew';
import LocationEdit from './components/locationEdit';
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
		path: '/locations/:locationId/',
		exact: true,
		component: LocationEdit
	},
	{
		path: '*',
		component: NotFound
	}
];
