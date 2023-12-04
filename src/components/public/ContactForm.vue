<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <!-- Contact form container -->
  <div class="contact-form">
    <!-- Vue form component -->
    <w-form v-model="valid" @submit.prevent="sendEmail" id="contactForm">
      <!-- Name input field -->
      <w-input
        required
        class="mb3 spacing"
        label="Name"
        color="info"
        bg-color="grey-light5"
        v-model="name"
        outline
        :validators="[validators.required]"
      ></w-input>

      <!-- Email input field -->
      <w-input
        required
        :validators="[validators.required]"
        class="mb3 spacing"
        label="E-mail address"
        color="info"
        bg-color="grey-light5"
        v-model="email"
        outline
      ></w-input>

      <!-- Divider for the message section -->
      <w-divider class="mx6 spacing">Your message</w-divider>

      <!-- Textarea for the message -->
      <w-textarea
        :validators="[validators.required]"
        class="mt4 spacing"
        v-model="message"
        label="Tell me..."
        color="info"
        bg-color="grey-light5"
        rows="10"
        outline
      ></w-textarea>

      <!-- Success message displayed upon successful form submission -->
      <w-alert class="spacing" v-if="showSuccessMessage" success dismiss>{{ successLabel }}</w-alert>

      <!-- Error message displayed if there's an error -->
      <w-alert class="spacing" v-if="errorLabel" error dismiss>{{ errorLabel }}</w-alert>

      <!-- Submit button -->
      <button value="Send" type="submit">Submit</button>
    </w-form>
  </div>
</template>


<script>
import emailjs from 'emailjs-com'; // Import the emailjs library

export default {
  name: 'contact', // Component name
  data() {
    return {
      showSuccessMessage: false, // Flag to control the display of success message
      name: '', // Name input field value
      email: '', // Email input field value
      message: '', // Message input field value
      captchaKey:  process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY, // Captcha key (not shown here)
      errorLabel: null, // Error message label
      successLabel: 'Message was sent! Thank you for contacting me', // Success message label
      valid: null, // Validation flag
      validators: {
        required: value => !!value || 'This field is required', // Validation for required fields
      },
    }
  },
  methods: {
    sendEmail() {
      try {
        if (this.name !== '' && this.email !== '' && this.message !== null && this.message !== '') {
          if (this.isEmailValid(this.email)) {
            // Sending mail using emailjs library
            var templateParams = {
              name: this.name,
              email: this.email,
              message: this.message,
            };
            emailjs.send(
              process.env.VUE_APP_EMAILJS_SERVICE_ID,
              process.env.VUE_APP_EMAILJS_TEMPLATE_ID,
              templateParams,
              process.env.VUE_APP_EMAILJS_USER_ID
            );
            this.errorLabel = false; // Clear any previous error message
            this.showSuccessMessage = true; // Display success message
            // Reset form values
            this.name = ' ';
            this.email = ' ';
            this.message = ' ';
          } else {
            this.errorLabel = 'E-mail format is invalid. Please correct it to send your message.';
            console.log(this.errorLabel);
          }
        }
      } catch (error) {
        console.log(error);
        this.errorLabel = 'An error occurred. Please contact me via social networks.';
      }
    },
    isEmailValid(email) {
      // Regular expression for email validation
      const emailRegexp = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
      );
      return emailRegexp.test(email); // Check if the email matches the regular expression
    },
  }
}
</script>


<style scoped>
  /* General spacing class */
  .spacing {
    margin: 17px; /* Apply a margin of 17px to all sides */
  }

  /* Styles for buttons */
  button {
    padding: 10px 40px; /* Apply padding of 10px top/bottom and 40px left/right */
    margin: 17px; /* Apply a margin of 17px to all sides */
    float: right; /* Float the button to the right */
  }

  /* Media query for screens with a max width of 667px (e.g., mobile screens) */
  @media (max-width: 667px) {
    .spacing {
      margin: 17px; /* Apply a margin of 17px to all sides */
    }

    button {
      float: none; /* Remove the float property */
      display: block; /* Change the button's display to block (stacks vertically) */
      margin-left: auto; /* Center the button horizontally by setting margin-left to auto */
      margin-right: auto; /* Center the button horizontally by setting margin-right to auto */
      margin-top: 30px; /* Apply a top margin of 30px */
      width: 70%; /* Set the button's width to 70% of the container */
    }
  }
</style>
