<template>
	<AppWrapperWidget>
		<ScrollWidget v-bind="{noNav:true}">
			<NavWidget activeNav="globe"  />

			<ContentWidget titleTxt="Tagged Event Photos From CEC" contentPadding="0">
				<div style="background-image:url(static/photo.png); background-repeat: no-repeat; background-size:cover; width:100%; height:600px;background-position:-360px 0px;" />
			</ContentWidget>

			<ContentWidget titleTxt="Tagged Event Photos From CEC" contentPadding="0">
				<iframe width="100%" height="600" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=lagoas%20park+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.maps.ie/create-google-map/">Google map generator</a></iframe>
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


/**
 * @description
 *
 */
export default {
	name: 'Globe-Page',
	components: {
		AppWrapperWidget,
		ScrollWidget,
		NavWidget,
		ContentWidget,
	},
	data() {
		return { };
	},
	/**
	 * Created
	 * on app init
	 */
	created() {
		//console.log('login init');
		const self = this;
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
		test() {

		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
