const state = {
	version: '0.0.1', //app version no
	major: 1, //support only this server release
	platform: 'web', //platform type [desktop, mobile web]
};

const mutations = {
	/**
	 * Loading
	 * Set app loading status
	 * @param {*} state
	 * @param {*} status
	 */
	loading(state, status) {
		state.loading = status;
	},
	/**
	 * updateAppState
	 * Updates state value
	 * @param {*} state
	 * @param {*} update
	 */
	updateAppState(state, update) {
		state[update.state] = update.val;
	},
};

const actions = {};

const getters = {
	whichPlatform: state => state.platform,
};


export default {
	state,
	mutations,
	actions,
	getters,
};
