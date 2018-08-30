<template>
	<AppWrapperWidget>
		<ScrollWidget v-bind="{noNav:true}">
			<NavWidget activeNav="assets2"  />

			<ContentWidget titleTxt="Training Assets" contentPadding="0">
				<iframe width="100%" height="560" frameborder="0" src="https://aic1-gse00015513.integration.ocp.oraclecloud.com/ic/builder/rt/teamTwoFileApp/live/webApps/galleryapp/"></iframe>
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
	name: 'Home-Page',
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
