<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <!-- Display tags if parsedData is not null -->
  <div v-if="parsedData != null" class="break">
      <!-- Iterate over parsedData to display tags -->
      <span
      v-for="(tag) in parsedData"
      :key="tag"
      class="spacing"
      :style="style">
      {{ tag }}
      </span>
  </div>
</template>


<script scoped>
  export default {
    name: 'tag-group',            // Component name
    props: {
      unparsedData: String,       // Prop to receive unparsed tag data as a string
      bgColor: String,            // Prop to receive background color
    },
    data: () => ({
      parsedData: null,           // Initialize parsedData as null
      backgroundColor: null,      // Initialize backgroundColor as null
    }),
    mounted() {
      // Split unparsedData by '/' to create an array of tags
      this.parsedData = this.unparsedData.split("/");
      this.backgroundColor = this.bgColor; // Assign the background color from the prop
    },
    computed: {
      // Computed property to generate the style for the tags
      style() {
        return 'background-color: ' + this.backgroundColor;
      }
    }
  };
</script>


<style scoped>
.spacing {
    margin: 3px;            /* Set margin around the element */
    color: white;            /* Text color */
    border: 0;               /* Remove border */
    border-radius: 20px;     /* Apply rounded corners with a 20px radius */
    padding: 5px 15px;       /* Set padding for the element */
    font-size: 16px;         /* Set font size */
}

.break {
    display: flex;           /* Display the container as a flex container */
    flex-wrap: wrap;         /* Allow items within the container to wrap to the next row when necessary */
}
</style>
