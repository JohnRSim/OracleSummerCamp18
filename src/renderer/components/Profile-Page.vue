<template>
	<AppWrapperWidget>
		<ScrollWidget v-bind="{noNav:true}">
			<NavWidget activeNav="profile"  />

			<ContentWidget titleTxt="Profile">
				<div class="row">
					<div class="col" style="width:200px;">
						<div class="profileImg profile" :style="{'background-image': profileImg}"></div>
						<ButtonWidget type="button"
							buttonTxt="Update Photo" style="width:auto; margin:10px auto;" v-on:click.native="updatePhoto"/>
					</div>
					<div class="col" style="width:100%; color:#999;">
						<div style="margin-left:20px;">
							<h2 style="margin:0px;">{{name}}</h2>
							<h4 style="margin:0px;">{{jobTitle}}</h4>

							<p>{{company}}</p>
						</div>
					</div>
				</div>
			</ContentWidget>
		</ScrollWidget>
	</AppWrapperWidget>
</template>

<script>
//import VueRecaptcha from 'vue-recaptcha';
import axios from 'axios';
import AppWrapperWidget from '@/components/widgets/AppWrapperWidget.vue';
import ScrollWidget from '@/components/widgets/ScrollWidget.vue';
import NavWidget from '@/components/widgets/NavWidget.vue';
import ContentWidget from '@/components/widgets/ContentWidget.vue';
import ButtonWidget from '@/components/widgets/ButtonWidget.vue';


/**
 * @description
 *
 */
export default {
	name: 'Profile-Page',
	components: {
		AppWrapperWidget,
		ScrollWidget,
		NavWidget,
		ContentWidget,
		ButtonWidget,
	},
	data() {
		return {
			profileImg: 'test',
			name: null,
			company: null,
			jobTitle: null,
		};
	},
	/**
	 * Created
	 * on app init
	 */
	created() {
		//console.log('login init');
		const self = this;
		if (localStorage.getItem('profileimg')) {
			self.profileImg = `url(data:image/jpeg;base64, ${localStorage.getItem('profileimg')})`;
		}

		self.name = localStorage.getItem('name');
		self.company = localStorage.getItem('company');
		self.jobTitle = localStorage.getItem('jobTitle');
	},
	/**
	 * before leaving remove event listeners
	 */
	beforeDestroy() {
		const self = this;
	},
	/**
	 * mounted
	 */
	mounted() {
		const self = this;
		setTimeout(() => {
			document.getElementById('web-messenger-container').classList.add('active');
		},1000);
	},
	/**
	 * Login Functions
	 */
	methods: {
		updatePhoto() {
			const self = this;

			navigator.camera.getPicture((base64) => {
				console.log(base64);
				//self.uploadToFolder('FEE887BB229A8B06A327C8482F4FC706A008B7B3FD69', fileLocation, 'download2.gif', 'This is a test file', '-234123412341234,-432342', 'fkm@klintra.fo');
				localStorage.setItem('profileimg', base64);
				self.profileImg = `url(data:image/jpeg;base64, ${localStorage.getItem('profileimg')})`;
			}, (fail) => {
				console.log(fail);
			}, {
				quality: 50,
      			encodingType: Camera.EncodingType.JPEG,
      			mediaType: Camera.MediaType.PICTURE,
				saveToPhotoAlbum: true,
				correctOrientation: true,
				destinationType: navigator.camera.DestinationType.DATA_URL,//FILE_URI,
				sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
			});
		},
		uploadToFolder(folder, fileLocation, filename, desc, gps, email) {
			const base = 'https://acecs-gse00015513.cec.ocp.oraclecloud.com/';
			const user = 'john.dunbar';
			const password = 'GlariNg@7Ling';

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
