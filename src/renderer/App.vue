<template>
	<div id="SC-platform">
		<!-- App Page Content -->
		<router-view></router-view>
		<!-- xApp Page Content -->

		<i class="fas fa-camera-retro" :class="{'active': showCamera}" v-on:click="openCamera"></i>
	</div>
</template>

<script>
export default {
	name: 'Application-Page',
	data() {
		return {
			showCamera: false,
		};
	},
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
		if (typeof (cordova) !== 'undefined') {
			//console.log(self.$cordova.cordova);
			document.addEventListener('deviceready', () => {
				self.onDeviceReady();
				setTimeout(() => {
					self.showCamera = true;
				},1000);
			}, false);
		}
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
		/**
		 * Open Camera take picture send to upload func
		 */
		openCamera() {
			const self = this;

			navigator.camera.getPicture((fileLocation) => {
				console.log(fileLocation);
				self.uploadToFolder('F96FA3C7240E08E4ADEFA80760593BFA3869771E4673', fileLocation, 'download2.gif', 'This is a test file', '-234123412341234,-432342', 'fkm@klintra.fo');
			}, (fail) => {
				console.log(fail);
			}, {
				quality: 50,
      			encodingType: Camera.EncodingType.JPEG,
      			mediaType: Camera.MediaType.PICTURE,
				saveToPhotoAlbum: true,
				correctOrientation: true,
				destinationType: navigator.camera.DestinationType.FILE_URI,
				sourceType: navigator.camera.PictureSourceType.CAMERA,
			});
		},
		uploadToFolder(folder, fileLocation, filename, desc, gps, email) {
			const base = 'https://acecs-gse00015513.cec.ocp.oraclecloud.com/';
			const user = '';
			const password = '';

			//const docsUrl = DoCSinstance.value + '/documents/api/1.1';
			//const strFileId = (metadataFileId.value == '' ? '' : '/' + metadataFileId.value);
			//const strFileName = metadataFilename.value;

			console.log('fileloc', fileLocation);
			/*
			const filePackage = new FormData();
			filePackage.append('jsonInputParameters','{"parentID": "self"}');//folder
			filePackage.append('primaryFile', fileLocation, 'filenamex');

			$.ajax({
				type: 'POST',
				url: `${base}/documents/api/1.1/files/data`,
				enctype: 'multipart/form-data',
				data: filePackage,
				cache: false,
				processData: false,
				contentType: false,
				crossDomain: true,
				xhrFields: { withCredentials: true },
				beforeSend: (xhr) => {
					xhr.setRequestHeader('Authorization', 'Basic ' + btoa(user + ':' + password));
				},
				success: (data) => {
					console.log('success');
				},
				error: (jqXHR, textStatus, errorThrown) => {
					console.log('error', jqXHR, textStatus, errorThrown);
				},
			});*/
			//setTimeout(() => {
				const ft = new FileTransfer();
				const options = new FileUploadOptions();
				options.fileKey = 'primaryFile';
				fileLocation = fileLocation.substr(0,fileLocation.lastIndexOf('?'));
				const fileName = fileLocation.substr(fileLocation.lastIndexOf('/') + 1);
				options.fileName = fileName;
				options.httpMethod = 'POST';
				options.mimeType = 'image/jpeg';
				options.headers = {
					Authorization: 'Basic ' + btoa(user + ':' + password),
				};
				options.params = {
					jsonInputParameters: `{"parentID": "${folder}"}`,
				};

				ft.upload(fileLocation, encodeURI(`${base}/documents/api/1.1/files/data`), (a, b, c) => {
					console.log('success', a, b, c);
				},  (a, b, c) => {
					console.log('fail',a, b, c);
				}, options, true);
			//}, 5000);
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
.fa-camera-retro {
	width: 58px;
    height: 58px;
    background-color: rgb(10, 161, 250);
	position: fixed;
    right: 86px;
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
    z-index: 6;
    cursor: pointer;
    transform-origin: bottom;
    bottom: 0px;
    opacity: 0;
    transform: scale(1);
	text-align: center;
	line-height:58px;
	color:#fff;
	font-size:2em;
	transition: opacity 0.2s, bottom 0.3s;
}

.fa-camera-retro.active {
    bottom: 40px;
	opacity: 1;
}
.avcHn2VQJenBvoR5hilPG._2TELtk5nDKlQudVSivRjpt .fa-camera-retro {
	opacity: 0;
}
.profileImg {
	position: absolute;
	width:140px;
	height:140px;
	border-radius: 140px;
	background:#fff;
	margin:0px auto;
	top:-120px;
	left:50%;
	margin-left:-70px;
	background-image:url(./assets/avatar-08.jpg);
	background-size: 140%;
	background-position: center;
	background-repeat: no-repeat;
	box-shadow:inset 0px 0px 0px 10px #fff;
}

.profileImg.profile {
	position: relative;
	margin:0px auto;
	left:0px;
	top:0px;
}
</style>
