import Vue from 'vue';
import Vuebar from 'vuebar';
import axios from 'axios';

//App, Router and Vuex Store
import App from './App';
import nav from './nav';
import store from './store';

if ((typeof (process) !== 'undefined') && (typeof (process.browser) === 'undefined')) {
//if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
	Vue.use(require('vue-electron'));
}

//quick axios access
Vue.http = Vue.prototype.$http = axios;

//Vue.config.productionTip = false;
Vue.config.productionTip = process.env.NODE_ENV === 'production';

//virtual scrollbar
Vue.use(Vuebar);

//
const AppData = Object.freeze({
	name: 'platform',
	version: store.state.app.version,
});
/* eslint-disable no-new */
new Vue({
	components: {
		App,
	},
	head: {
		meta: [{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
		}],
	},
	router: nav,
	store,
	template: '<App/>',
}).$mount('#SC-platform');
