<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <!-- Container for the 'Get in Touch' section -->
  <div class="getInTouch">
    <!-- Card layout for the main content -->
    <w-card class="main-content">
      <!-- Title for the contact section -->
      <h1 class="title">{{ title }}</h1>
      <!-- Contact form component inclusion -->
      <ContactForm></ContactForm>
    </w-card>
  </div>
</template>

<script>
// Importing the ContactForm component and Vuex store
import ContactForm from '@/components/public/ContactForm.vue';
import { useStore } from 'vuex'

export default {
  name: "contact-view",
  components: {
    ContactForm
  },
  data() {
    return {
      // Title for the contact page
      title: "Get in touch",
      // Access to the Vuex store
      store: useStore()
    };
  }
};
</script>

<style scoped>
/* Styling for the main content of the contact page */
.main-content{
  margin-top: 100px;
  margin-left: 100px;
  margin-right: 100px;
  background-color: rgba(255, 255, 255, 1);
}

/* Styling for the container of the contact section */
.getInTouch{
  height: 100vh;
}

/* Dark theme specific styling for the card */
.dark .w-card {
  background-color: black;
}

/* Styling for the page title */
.title {
  margin-left: 10px;
  font-size: 40px;
}

/* Responsive styling for smaller screens */
@media (max-width: 667px) {
  .title {
    text-align: center;
    margin: 0;
    font-size: 40px;
  }
  .main-content{
    margin-top: 15px;
    margin-left: 12px;
    margin-right: 12px;
    transition: 0.3s;
  }
}
</style>
