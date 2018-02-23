import App from './containers/app';
import Home from './components/home';
import About from './components/about';

export default [
	{
		component: App,
		routes: [
			{
				path: '/',
				exact: true,
				component: Home
			},
			{
				path: '/about',
				component: About
			}
		]
	}
];
