<template>
	<AppWrapperWidget>
		<ScrollWidget v-bind="{noNav:true}">
			<NavWidget activeNav="home" />

			<ContentWidget titleTxt="Home" style="font-size:0.8em;">
				<h3>Oracle PaaS Partner Community Forum 2018</h3>
				<h4>the conference for Oracle Partners</h4>
				<p>
					The Oracle PaaS Partner Community Forum is a one week conference for cutting-edge software consultants, 
					engineers and enterprise-level professionals. The #PaaSForum brings together the world’s leading Oracle 
					experts in the fields of integration, API management, process management, microservices, machine learning, 
					mobile, chabot, content management and blockchain.
				</p>
			</ContentWidget>
			<ContentWidget style="font-size:0.8em;" contentPadding="0">
				<iframe width="100%" height="315" src="https://www.youtube.com/embed/_P17vr7kdM0?autoplay=1" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen=""></iframe>
			</ContentWidget>

			<ContentWidget titleTxt="Conference tracks">
				<div class="row" style="padding:10px;">
					<img style="margin-right:10px;border-radius:10px" src="https://www.oracle.com/webfolder/s/delivery_production/images/FY16h1/image11/Enterprise.jpg" alt="Logo" width="72" height="72">
					Enterprise Process &amp; Integration and    API Management
				</div>
				<div class="row" style="padding:10px;">
					<img style="margin-right:10px;border-radius:10px" src="https://www.oracle.com/webfolder/s/delivery_production/images/FY16h1/image11/Application.jpg" alt="Logo" width="72" height="72">
					Application Development with Microservices    and Containers
				</div>
				<div class="row" style="padding:10px;">
					<img style="margin-right:10px;border-radius:10px" src="https://www.oracle.com/webfolder/s/delivery_production/images/FY16h1/image11/Mobile.jpg" alt="Logo" width="72" height="72">
					Mobile &amp; Chatbot and Content Management
				</div>
				<div class="row" style="padding:10px;">
					<img style="margin-right:10px;border-radius:10px" src="https://www.oracle.com/webfolder/s/delivery_production/images/FY16h1/image11/Innovation.jpg" alt="Logo" width="72" height="72">
					Innovation: blockchaine and machine learning
				</div>
			</ContentWidget>

			<ContentWidget titleTxt="Speakers">
				<img style="border-radius:6px; margin:4px;" width="138" height="138" src="https://www.oracle.com/webfolder/s/delivery_production/images/FY16h1/image11/Amit Zavery.jpg" alt="Amit Zavery">
				<img style="border-radius:6px; margin:4px;" border="0" width="135" height="135" src="https://www.oracle.com/webfolder/s/delivery_production/images/FY16h1/image11/Copy of Chris Peytier.jpg" alt="Chris Peytier">
				<img style="border-radius:6px; margin:4px;" border="0" width="136" height="136" src="https://www.oracle.com/webfolder/s/delivery_production/images/FY16h1/image11/Darko Vukovic.jpg" alt="Darko Vukovic">
				<img style="border-radius:6px; margin:4px;" border="0" width="133" height="133" src="https://www.oracle.com/webfolder/s/delivery_production/images/FY16h1/image11/Deepak Arora.jpg" alt="Deepak Arora">
			</ContentWidget>
			<ContentWidget contentPadding="0">
				<img src="https://www.oracle.com/webfolder/s/delivery_production/images/FY16h1/image11/Copy of 7.jpg" alt="Image" width="100%">
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
