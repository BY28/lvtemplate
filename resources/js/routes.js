import VueRouter from 'vue-router';

let routes = [

	{
		path: '/home',
		component: require('./components/ExampleComponent').default
	},
	{
		path: '/dashboard',
		component: require('./views/Dashboard').default
	},
	{
		path: '/users',
		component: require('./views/Users').default
	}

];

export default new VueRouter({

	mode: 'history',
	linkActiveClass: 'active',
	routes

});