<template>
	<div id="SC-platform">
		<!-- App Page Content -->
		<router-view></router-view>
		<!-- xApp Page Content -->
	</div>
</template>

<script>
export default {
	name: 'Application-Page',
	/**
	 * Created
	 * on app init
	 * - Setup Event Listener for user obj updates
	 * - Check user session still works and login user
	 * - Display loading splash screen until session redirects to login or dashboard page
	 */
	created() {
		const self = this;
		console.log('[app init]');
	},
	/**
	 * Global App Functions
	 */
	methods: {
		onDeviceReady() {
			const self = this;
			// Handle the device ready event.
			document.addEventListener('pause', self.onPause, false);
			document.addEventListener('resume', self.onResume, false);
			if (device.platform === 'Android') {
				document.addEventListener('backbutton', self.onBackKeyDown, false);
			}

			if (typeof (cordova.plugins) === 'undefined') {
				console.log('Error: Plugins not defined..');
			}
		},
		onPause() {
			// Handle the pause lifecycle event.
			console.log('pause');
		},
		onResume() {
			// Handle the resume lifecycle event.
			// SetTimeout required for iOS.
			setTimeout(() => {
				console.log('resume');
			}, 0);
		},
		onBackKeyDown() {
			// Handle the back-button event on Android. By default it will exit the app.
			navigator.app.exitApp();
		},
		/**
		 * Close Window
		 * Hides electron in tray
		 */
		closeWindow() {
			const self = this;
			//this.$electron.remote.app.quit();
			if (self.$store.getters.whichPlatform === 'desktop') {
				//stop chart if hiding app - would cause app to freeze on some devices.
				self.$store.commit('updateMinerState', {
					val: false,
					state: 'showChart',
				});
				self.$electron.ipcRenderer.send('hideApp');
			}
		},
		/**
		 * Minimise Window
		 * Minimises app to taskbar
		 */
		minimiseWindow() {
			const self = this;
			if (self.$store.getters.whichPlatform === 'desktop') {
				self.$electron.remote.BrowserWindow.getFocusedWindow().minimize();
			}
		},
	},
};
</script>

<style>
/* Globals */
* {
	outline:none;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	-webkit-tap-highlight-color: transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
	user-select: none;
	cursor: default;
}

.draggable-area {
    -webkit-app-region: drag;
}
/*
.tooltip-content {
	word-break:break-all;
	font-size: 0.8em;
	user-select:all;
}*/
/*Fixes clipboard issue*/
input,
textarea {
	user-select:all;
}


html, body {
	background:#121117;
	margin:0px;
	padding:0px;
	overflow: hidden;
}

body {
	padding:4px;
	font-size: 16px;
	font-family: 'Nunito', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
body.platformWeb.mobile {
	font-size:12px;
}

.row {
	display:flex;
}

.col {
	position: relative;
	flex-grow:1;
}

.hr {
	background: #606060;
	height:2px;
	margin:30px 0px;
}
.hr hr {
	display: none;
}
select {
	background: #fff;
    border-bottom: solid 1px #ddd;
	    border: 0px;
    /* border-bottom: solid 1.5px #30c1ea; */
    color: #a5a5a5;
    padding: 4px 8px;
    height: 32px;
    line-height: 32px;
    font-size: 1em;
    flex-grow: 1;
    margin: 26px 6px 8px;
    color: #666;
    border-radius: 3px;
    cursor: text;
	max-width:277px;
}

.draggable-area {
    -webkit-app-region: drag;
}
</style>
