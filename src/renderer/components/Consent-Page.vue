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
					<ContentWidget class="loginFormContainer" style="margin-top:80px; font-size:0.65em;">
						<h4 class="title">PUBLICITY RELEASE FOR LIKENESS USED IN ORACLE MATERIALS</h4>
						<p>
							I hereby grant Oracle Corporation and its subsidiaries and affiliates under common control (“Oracle”)
							permission to use my name, picture, image, likeness, voice, biographical information and portrait and any
							statements, quotes or testimonials provided by me (collectively, “My Likeness”) in connection with Oracle
							products and services, and materials and activities that promote Oracle’s products or services
							(collectively, “Oracle Materials”). This includes the worldwide right to use, copy, distribute, exhibit,
							translate, broadcast, transmit, perform, publish, display, alter and create derivative works from the Oracle
							Materials containing My Likeness in any manner and in any media now or hereafter devised. Oracle shall
							have the right to edit, rearrange, vary, change, alter, modify, and delete My Likeness in the Oracle
							Materials, so long as the use of My Likeness is not misleading, disparaging or defamatory. I understand
							that I have the right to request to review, correct, update, suppress, or otherwise modify My Likeness
							contained in the Oracle Materials, or withdraw my consent to the use or processing of My Likeness
							by Oracle. However, I understand that Oracle may not be able to recall Oracle Materials which are
							already publicly available and may include My Likeness.
						</p>
						<p>
							Oracle is under no obligation to make use of or to provide compensation for any of the rights or
							permissions granted by this Release. Oracle shall be the exclusive owner of all right, title and interest,
							including copyright, in the Oracle Materials. I hereby waive the benefits of any provision of law known as
							“droit moral” and/or “moral rights” or any similar law in any jurisdiction.
							I am over the age of eighteen and legally competent to sign this Release, or I have acquired the written
							consent of my parent or guardian, which appears below. I understand that the terms herein are
							contractual and not a mere recital and that this instrument is legally binding. I have signed this document
							of my own free act.
						</p>
						<p>
							This agreement contains the parties’ entire understanding relative to its subject matter. This Release is
							intended to be as broad and inclusive as permitted by applicable law. In the event that any clause or
							provision of this Release shall be held to be invalid by any court of competent jurisdiction, the invalidity of
							such a clause or provision shall not otherwise affect the remaining clauses and provisions of the Release,
							which shall continue to be enforceable.
						</p>
					</ContentWidget>
					<ContentWidget class="loginFormContainer" style="overflow:inherit;">
						
						
						<h4 class="title">I accept and agree to:</h4>
						<!-- User Pass login interface -->
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
						
						<!-- User Input -->
						<div class="row">
							<InputWidget 
								v-model="form.printName.val"
								placeholder="Full Name *"
								name="printName"
								maxlength="254"
								ref="printName"
								:showLabel="form.printName.displayLabel"
								:flag="!form.printName.valid || form.printName.flag"
								@keyup="keyWatch('printName')" />
						</div>
						<!-- xUser Input -->
						
						<!-- User Input -->
						<div class="row">
							<InputWidget 
								v-model="form.signedDate.val"
								placeholder="Signed Date *"
								name="signedDate"
								ref="signedDate"
								inputFieldType="datetime"
								:showLabel="form.signedDate.displayLabel"/>
						</div>
					</ContentWidget>
					
					<ContentWidget>
						<!-- xUser Input -->
						<h4 class="title">Signature</h4>
						<p>
							Please sign below:
						</p>
						<div class="row">
							<div class="col">
								<div class="fullWidth">
									<!-- Signature -->
									<canvas></canvas>
									<!-- xSignature -->
								</div>
							</div>
						</div>

						<!-- xUser Pass login interface -->
					</ContentWidget>
					
					<div class="row" style="margin: 16px 30px">
						<ButtonWidget type="submit"
							buttonTxt="Continue" style="margin-left:5px;"/>
						<ButtonWidget type="button"
							buttonTxt="Cancel" style="margin-left:15px;" v-on:click.native="loginRoute"/>
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
import SignaturePad from 'signature_pad/dist/signature_pad.js';
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
	name: 'Registration-Page',
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
			signaturePad: null,
			signaturePadVal: null,
			//form modal
			form: {
				required: ['email', 'signedDate', 'printName'], //required fields
				email: {
					val: '',				//field value
					displayLabel: false,	//field label
					valid: true,			//valid value
					flag: false,			//has value length
				},
				signedDate: {
					val: '2018-08-30',
					displayLabel: true,
					flag: false,
				},
				printName: {
					val: '',				//field value
					displayLabel: false,	//field label
					valid: true,			//valid value
					flag: false,			//has value length
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
		const self = this;
		self.form.email.val = localStorage.getItem('email');
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
		const canvas = document.querySelector('canvas');

		self.signaturePad = new SignaturePad(canvas, {
              backgroundColor: 'rgba(255, 255, 255, 0)',
              penColor: 'rgb(0, 0, 0)',
        });

		///signaturePad.toDataURL("image/jpeg"); // save image as JPEG
		///signaturePad.toDataURL("image/svg+xml"); // save image as SVG

		// Draws signature image from data URL.
		// NOTE: This method does not populate internal data structure that represents drawn signature. Thus, after using #fromDataURL, #toData won't work properly.
		//signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...");

		// Returns signature image as an array of point groups
		//const data = signaturePad.toData();

		// Draws signature image from an array of point groups
		//signaturePad.fromData(data);

		// Clears the canvas
		//signaturePad.clear();

		// Returns true if canvas is empty, otherwise returns false
		//signaturePad.isEmpty();

		// Unbinds all event handlers
		//signaturePad.off();

		// Rebinds all event handlers
		//signaturePad.on();
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
			if (self.signaturePad.isEmpty()) {
				self.form.error.display = true;
				self.form.error.msg = 'Please sign the consent form!';
				return;
			}

			//if form pass check then submit captcha
			if (checkRequiredFields) {
				self.loading = true;
				self.form.error.display = false;
				//console.log('sig', self.signaturePad);
				//console.log('base', );
				//console.log('signaturePadVal', self.signaturePadVal);
				// Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
				self.signaturePadVal = self.signaturePad.toDataURL('image/jpeg', 1.0); // save image as PNG
				const sigBase = self.signaturePad.toDataURL();//self.signaturePad.toDataURL('image/jpeg');
				//console.log(sigBase);
				console.log('base64', self.signaturePad.toDataURL());
				const consent = {
					processDefId: 'oracleinternalpcs~ConsentementApprobation!2~ConsentValidationForm',
					serviceName: 'ConsentValidationForm.service',
					operation: 'startEvent',
					action: 'Submit',
					params: {
						startPayload: {
							email: self.form.email.val,
							printName: self.form.printName.val,
							signDate: self.form.signedDate.val,
							signature: sigBase.replace(/^data:image\/[a-z]+;base64,/, ''),
						},
					},
				};
				//console.log(self.signaturePad.toDataURL('image/jpeg', 1.0));
				fetch('https://aic1-gse00015513.integration.ocp.oraclecloud.com/bpm/api/4.0/processes', {
					method: 'POST',
					body: JSON.stringify(consent), // data can be `string` or {object}!
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Basic ' + window.btoa('john.dunbar:GlariNg@7Ling'),
					},
				}).then((res) => {
					console.log('res', res);
					return res.json();
				}).then((response) => {
					console.log('Success:', JSON.stringify(response));
					console.log(response);
					const dataset = JSON.stringify(response);
					localStorage.setItem('processid', response.processId);
					this.$swal('Oracle are reviewing your consent - you will receive an email when approved - You will then be allowed to login.');
					self.$router.push('/login');
					/*
					fetch(`https://aic1-gse00015513.integration.ocp.oraclecloud.com/bpm/api/4.0/processes/${response.processId}`, {
						method: 'GET',
						//body: JSON.stringify(consent), // data can be `string` or {object}!
						headers: {
							Authorization: 'Basic ' + window.btoa('john.dunbar:GlariNg@7Ling'),
						},
					}).then((res) => {
						console.log('res', res);
						return res.json();
					}).then((response) => {
						self.loading = false;
						console.log('Success:', JSON.stringify(response));
						console.log('final response on process', response);
						this.$swal('Oracle are reviewing your consent - you will receive an email when approved - You will then be allowed to login.');
						self.$router.push('/login');
					}).catch((error) => {
						self.loading = false;
						console.error('Error:', error);
					});
					*/
					/*if (response.resultCode === 'Failure') {
						self.form.error.display = true;
						self.form.error.msg = 'Failed to submit form - Invalid User';
					} else {
						if (response.approvalStatus === 'NONE') {
							self.$router.push('/consent');
						} else {
							self.$router.push('/home');
						}
					}*/
				}).catch((error) => {
					console.error('Error:', error);
				});
			} else {
				self.form.error.display = true;
				self.form.error.msg = 'Failed to submit form - please check all required fields';
			}
		},
		loginRoute() {
			const self = this;
			self.$router.push('/login');
		},
		updateCountryCodeVal(val) {
			const self = this;
			self.form.country.val = val;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h4.title {
	margin:10px 0px 0px 0px;
}
canvas {
	border: 0px;
    /* border-bottom: solid 1.5px #30c1ea; */
    border-bottom: solid 1px #ddd;
    background: #fff;
    color: #a5a5a5;
    padding: 4px 8px;
    font-size: 1em;
    /* margin: 26px 16px 8px; */
    color: #666;
    border-radius: 3px;
    cursor: text;
	margin: 26px auto 8px;
}
.fullWidth {
    display: flex;
    flex-grow: 1;
}
</style>
