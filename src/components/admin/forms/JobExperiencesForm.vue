<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <!-- Container for displaying a list of job experiences -->
  <div class="job-experiences">
    <!-- Use the 'ListOfRows' component to display rows of job experiences -->
    <ListOfRows :formType="formTypeToShare"></ListOfRows>
  </div>
</template>

<script>
import ListOfRows from '../ListOfRows.vue'; // Import the 'ListOfRows' component

export default {
  data() {
    return {};
  },
  components: {
    ListOfRows, // Register the 'ListOfRows' component
  },
  props: {
    formTypeToShare: String, // Declare a prop named 'formTypeToShare' of type String
  },
};
</script>

<style scoped>
</style>
