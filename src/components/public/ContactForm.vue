<template>
    <div class="contact-form">
        <w-form v-model="valid" @submit.prevent="sendEmail" id="contactForm">
            <w-input 
                required
                class="mb3 spacing" 
                label="Name"
                v-model="name"
                bg-color=""
                outline
                :validators="[validators.required]">
            </w-input>

            <w-input
                required
                :validators="[validators.required]"
                class="mb3 spacing"
                label="E-mail address"
                v-model="email"
                bg-color=""
                outline>
            </w-input>

            <w-divider class="mx6 spacing">Your message</w-divider>

            <w-textarea
                :validators="[validators.required]"
                class="mt4 spacing"
                v-model="message"
                label="Tell me..."
                bg-color=""
                rows="10"
                outline>
            </w-textarea>

            <w-alert class="spacing" v-if="showSuccessMessage" success dismiss>Message was sent! Thank you for contacting me</w-alert>
            <w-alert class="spacing" v-if="errorLabel" error dismiss>{{errorLabel}}</w-alert>

            <button style="float:right" value="Send" type="submit" class="spacing">Submit</button>
        </w-form>
    </div>
</template>


<script >
import emailjs from 'emailjs-com';
  
export default {
  name: 'ContactUs',
  components: {  },
  data() {
    return {
      showSuccessMessage: false,
      name: '',
      email: '',
      message: '',
      captchaKey:  process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY,
      errorLabel: null,
      valid: null,
      validators: {
        required: value => !!value || 'This field is required'
      },

    }
  },
  methods: {
    sendEmail() {
      try {
        if(this.name != '' && this.email != '' && this.message != null){
          if(this.isEmailValid(this.email)){
            emailjs.sendForm(
              process.env.VUE_APP_EMAILJS_SERVICE_ID,
              process.env.VUE_APP_EMAILJS_TEMPLATE_ID, 
              '#contactForm',
              process.env.VUE_APP_EMAILJS_USER_ID)
            this.showSuccessMessage = true;

            this.name = ''
            this.email = ''
            this.message = ''
          }
          else {
            this.errorLabel = 'E-mail format is invalid. Please correct it to send your message.';
            console.log(this.errorLabel)
          }
        }
       
      } catch(error) {
        this.errorLabel = 'An error occured. Please contact me via social networks.';
      }
    },
    isEmailValid(email) {
      const emailRegexp = new RegExp(
      /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
      )
      return emailRegexp.test(email)
    },
  },
  mounted(){
  }
}
</script>


<style scoped>
    .spacing{
      margin: 17px;
    }
</style>