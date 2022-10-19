<template>
    <div class="contact-form">
        <w-form v-model="valid" @submit.prevent="sendEmail" id="contactForm">
            <w-input 
            required
            class="mb3 spacing" 
            label="Name"
            color="info"
            bg-color="grey-light5"
            v-model="name"
            outline
            :validators="[validators.required]">
            </w-input>

            <w-input
            required
            :validators="[validators.required]"
            class="mb3 spacing"
            label="E-mail address"
            color="info"
            bg-color="grey-light5"
            v-model="email"
            outline>
            </w-input>

            <w-divider class="mx6 spacing">Your message</w-divider>

            <w-textarea
            :validators="[validators.required]"
            class="mt4 spacing"
            v-model="message"
            label="Tell me..."
            color="info"
            bg-color="grey-light5"
            rows="10"
            outline>
            </w-textarea>

            <w-alert class="spacing" v-if="showSuccessMessage" success dismiss>{{successLabel}}</w-alert>
            <w-alert class="spacing" v-if="errorLabel" error dismiss>{{errorLabel}}</w-alert>
            <button value="Send" type="submit">Submit</button>
        </w-form>
    </div>
</template>


<script>
import emailjs from 'emailjs-com';
  
export default {
  name: 'contact',
  data() {
    return {
      showSuccessMessage: false,
      name: '',
      email: '',
      message: '',
      captchaKey:  process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY,
      errorLabel: null,
      successLabel: 'Message was sent! Thank you for contacting me',
      valid: null,
      validators: {
        required: value => !!value || 'This field is required'
      },
    }
  },
  methods: {
    sendEmail() {
      try {
        if(this.name != '' && this.email != '' && this.message != null && this.message != ''){
          if(this.isEmailValid(this.email)){
            // sending mail
            var templateParams = {
              name: this.name,
              email: this.email,
              message : this.message
            };
            emailjs.send(
              process.env.VUE_APP_EMAILJS_SERVICE_ID,
              process.env.VUE_APP_EMAILJS_TEMPLATE_ID, 
              templateParams, //'#contactForm',
              process.env.VUE_APP_EMAILJS_USER_ID
              )
              this.showSuccessMessage = true;
              // reseting form values
              this.name = ' '
              this.email = ' '
              this.message = ' '
          }
          else {
            this.errorLabel = 'E-mail format is invalid. Please correct it to send your message.';
            console.log(this.errorLabel)
          }
        }
      } catch(error) {
        console.log(error)
        this.errorLabel = 'An error occured. Please contact me via social networks.';
      }
    },
    isEmailValid(email) {
      const emailRegexp = new RegExp(
      /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
      )
      return emailRegexp.test(email)
    },
  }
}
</script>


<style scoped>
.spacing{
  margin: 17px;
}

button {
  padding: 10px 40px;
  margin: 17px;
  float:right;
}

@media (max-width: 667px) {
  .spacing{
    margin: 17px;
  }

  button {  
    float: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    width: 70%;
  }
}
</style>