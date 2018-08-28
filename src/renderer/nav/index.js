import Vue from 'vue';
import Router from 'vue-router';

//home
import home from '@/components/Home-Page';

//store
import store from '../store';

Vue.use(Router);

const router = new Router({
	mode: ((typeof (process) !== 'undefined') && (typeof (process.browser) === 'undefined'))?'hash':'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: home,
		},
	],
});

/**
 * Before each route check user is authenticated on next path else redirect to login
 */
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if ((requiresAuth) && (!store.state.user.loggedIn)) {
		next('login');
	} else {
		next();
	}
});

export default router;
