<template>
	<AppWrapperWidget>
		<ScrollWidget v-bind="{noNav:true}">
			<nav id="SC-nav">
				<ul>
					<li><i class="fas fa-home" title="home"></i></li>
					<li><i class="fas fa-user-circle" title="profile"></i></li>
					<li><i class="fas fa-file-invoice" title="assets"></i></li>
					<li><i class="fas fa-file-invoice"></i></li>
					<li><i class="fas fa-stroopwafel"></i></li>
					<li><i class="fas fa-sign-out-alt" title="logout"></i></li>
				</ul>
			</nav>

			test
		</ScrollWidget>
	</AppWrapperWidget>
</template>

<script>
//import VueRecaptcha from 'vue-recaptcha';
import axios from 'axios';
import AppWrapperWidget from '@/components/widgets/AppWrapperWidget.vue';
import ScrollWidget from '@/components/widgets/ScrollWidget.vue';


/**
 * @description
 *
 */
export default {
	name: 'Home-Page',
	components: {
		AppWrapperWidget,
		ScrollWidget,
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
