<template>
    <div class="contact-form">
        <br/>
        <form @submit.prevent="sendEmail" id="contactForm">
            <w-input
                required
                class="mb3"
                label="Name"
                v-model="name"
                color="info"
                outline>
            </w-input>
            <w-input
                required
                class="mb3"
                label="E-mail address"
                v-model="email"
                color="info"
                outline>
            </w-input>
            <br/>

            <w-divider class="mx6">Your message</w-divider>

            <w-textarea
                required
                class="mt4"
                v-model="message"
                outline
                rows="10">
            </w-textarea>
          
            <br> 

            <button style="float:right" value="Send" type="submit">Submit</button>

            <w-alert v-if="showSuccessMessage" success dismiss>Message was sent!</w-alert>
            <w-alert  v-if="showErrorMessage" error dismiss>An error occured. Please contact me via social networks.</w-alert>

            <br> 
            <br> 
        </form>
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
        showErrorMessage: false,
        name: '',
        email: '',
        message: '',
        captchaKey:  process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY,
    }
  },
  methods: {
    sendEmail() {
      try {
        console.log("attempt to send email")
        emailjs.sendForm(
            process.env.VUE_APP_EMAILJS_SERVICE_ID,
            process.env.VUE_APP_EMAILJS_TEMPLATE_ID, 
            '#contactForm',
            process.env.VUE_APP_EMAILJS_USER_ID)
            this.showSuccessMessage = true;
      } catch(error) {
        this.showErrorMessage = true;
          console.log({error})
      }
      this.name = ''
      this.email = ''
      this.message = ''
    },
  },
  mounted(){
    console.log("mounted")
  }
}
</script>


<style scoped>
    .send {
        margin: 25px;
    }
</style>