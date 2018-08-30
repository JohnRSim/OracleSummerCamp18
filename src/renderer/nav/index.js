import Vue from 'vue';
import Router from 'vue-router';

//home
import home from '@/components/Home-Page';
import login from '@/components/Login-Page';
import register from '@/components/Registration-Page';
import consent from '@/components/Consent-Page';
import profile from '@/components/Profile-Page';
import assets from '@/components/Assets-Page';
import assets2 from '@/components/Assets2-Page';
import logout from '@/components/Logout-Page';

//store
import store from '../store';

Vue.use(Router);

const router = new Router({
	mode: 'hash',//((typeof (process) !== 'undefined') && (typeof (process.browser) === 'undefined'))?'hash':'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: home,
		},
		{
			path: '/register',
			name: 'register',
			component: register,
		},
		{
			path: '/login',
			name: 'login',
			component: login,
		},
		{
			path: '/consent',
			name: 'consent',
			component: consent,
		},
		{
			path: '/home',
			name: 'home',
			component: home,
		},
		{
			path: '/profile',
			name: 'profile',
			component: profile,
		},
		{
			path: '/assets',
			name: 'assets',
			component: assets,
		},
		{
			path: '/assets2',
			name: 'assets2',
			component: assets2,
		},
		{
			path: '/logout',
			name: 'logout',
			component: logout,
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
