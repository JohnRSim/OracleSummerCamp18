<template>
	<AppWrapperWidget>
		<ScrollWidget v-bind="{noNav:true}">
			<!-- Animation to display during server requests -->
			<SpinnerWidget :class="{active:loading}"/>
			<!-- xAnimation to display during server requests -->

			<!-- Login error display -->
			<FormErrorDisplayWidget v-on:click.native="closeError" v-if="form.error.display" :errorMsg="form.error.msg" style="width: 60%; margin: 10px auto;" />
			<!-- xLogin error display -->

			<!-- Login Form -->
			<form id="SC-loginForm" @submit.prevent="onSubmit" :class="{hide:loading}" autocomplete="off">
				<div v-if="status.displayForm" id="SC-loginFormWrapper">
					<ContentWidget class="loginFormContainer" style="margin-top:200px; overflow:inherit;">
						<!-- profile Img -->
						<div class="profileImg">

						</div>
						<!-- xprofile Img -->
						<!-- User Pass login interface -->
						<div>
							<!-- User Input -->
							<div class="row">
								<InputWidget 
									v-model="form.email.val"
									placeholder="Email *"
									name="email"
									maxlength="254"
									ref="email"
									:showLabel="form.email.displayLabel"
									:flag="!form.email.valid || form.email.flag"
									@keyup="keyWatch('email')" />
							</div>
							<!-- xUser Input -->
							
							<!-- Password Input -->
							<div class="row">
								<div class="col">
									<InputWidget 
										inputType="password"
										v-bind="{hideShow: true}"
										v-model="form.password.val"
										newpassword="current-password"
										placeholder="Password *"
										name="password"
										maxlength="254"
										ref="password"
										:showLabel="form.password.displayLabel"
										:flag="form.password.flag"
										@keyup="keyWatch('password')" />
								</div>
							</div>
							<!-- xPassword Input -->
						</div>
						<!-- xUser Pass login interface -->
						
					</ContentWidget>
					
					<div class="row" style="margin: 16px 30px">
						<ButtonWidget type="submit"
							buttonTxt="Login" />
						<ButtonWidget type="button"
							buttonTxt="Register" style="margin-left:15px;" v-on:click.native="registerRoute"/>
					</div>
				</div>
			</form>				
			<!-- xLogin Form -->
		</ScrollWidget>
	</AppWrapperWidget>
</template>

<script>
//import VueRecaptcha from 'vue-recaptcha';
import axios from 'axios';
import AppWrapperWidget from '@/components/widgets/AppWrapperWidget.vue';
import ContentWidget from '@/components/widgets/ContentWidget.vue';
import FormErrorDisplayWidget from '@/components/widgets/FormErrorDisplayWidget.vue';
import SpinnerWidget from '@/components/widgets/SpinnerWidget.vue';
import InputWidget from '@/components/widgets/InputWidget.vue';
import ButtonWidget from '@/components/widgets/ButtonWidget.vue';
import ScrollWidget from '@/components/widgets/ScrollWidget.vue';

/**
 * @description
 *
 */
export default {
	name: 'Login-Page',
	components: {
		AppWrapperWidget,
		ContentWidget,
		FormErrorDisplayWidget,
		SpinnerWidget,
		InputWidget,
		ButtonWidget,
		ScrollWidget,
	},
	data() {
		return {
			showPass: false,			//password input set eye icon
			passDisplay: 'password',	//password input type ['password','text']
			loading: false,				//communicating with the server.
			//form modal
			form: {
				required: ['email', 'password'], //required fields
				email: {
					val: '',				//field value
					displayLabel: false,	//field label
					valid: true,			//valid value
					flag: false,			//has value length
				},
				password: {
					val: '',
					displayLabel: false,
					flag: false,
				},
				//form error display
				error: {
					msg: '',		//form error messages
					display: false, //display error message
				},
			},
			status: {
				displayForm: true,		//display login form
				submittedForm: false,	//form succesfully submitted
				error: false,			//error detected
			},
		};
	},
	/**
	 * Created
	 * on app init
	 */
	created() {
		//console.log('login init');
		const self = this;
		console.log('[LOGIN PAGE init]');
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
	},
	/**
	 * Login Functions
	 */
	methods: {
		/**
		 * onKeyUp set field display and check field value is correct (email etc)
		 * TODO - tidy up and replace with ButtonWidget
		 *
		 * @param {string} input - data authcode reference
		 * @returns nothing
		 * @public
		 */
		keyWatch(input) {
			const self = this;
			//if input value remove placeholder and show label above input
			if (self.form[input].val.length > 0) {
				self.form[input].flag = false;
				self.form[input].displayLabel = true;
				//if input email check format
				if (input === 'email') {
					self.checkEmail();
				}
			//no value reset field
			} else {
				self.form[input].displayLabel = false;
				self.form[input].flag = true;
			}
		},
		/**
		 * Confirms email is in a valid format
		 * (Better approach than htm5 input email type)
		 *
		 * @returns nothing
		 * @public
		 */
		checkEmail() {
			const self = this;
			//email has value
			if (self.form.email.val.length > 0) {
				self.form.email.valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.form.email.val);
			//no value reset
			} else {
				self.form.email.valid = true;
			}
		},
		/**
		 * Submit Login form
		 * - Check all required fields have value
		 * - show captcha form if not processed else Submit with captcha code
		 *
		 * @returns nothing
		 * @public
		 */
		onSubmit() {
			const self = this;
			let checkRequiredFields = true;
			//check required fields have data
			self.form.required.forEach(function(value) {
				self.form[value].flag = false;
				if (self.form[value].val.length === 0) {
					self.form[value].flag = true;
					checkRequiredFields = false;
				}
			});

			//store email for quick login
			localStorage.setItem('email', self.form.email.val);

			//if form pass check then submit captcha
			if (checkRequiredFields) {
				self.loading = true;
				self.form.error.display = false;
				//window.hex_md5(self.form.email);
			} else {
				self.form.error.display = true;
				self.form.error.msg = 'Failed to submit form - please check all required fields';
			}
		},
		registerRoute() {
			const self = this;
			self.$router.push('/register');
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
