<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <!-- Container for a single list row -->
    <div class="list-row">
  
      <!-- Card element to display content -->
      <w-card>
        <!-- Title of the list item -->
        <h4 style="float: left;">{{ title }}</h4>
  
        <!-- Container for edit and delete buttons -->
        <div style="float: right;">
          <!-- Edit button with a green background -->
          <button class="editButton" style="float: left;" @click="editRow">Edit</button>
  
          <!-- Delete button with a red background -->
          <button class="deleteButton" style="float: right;" @click="removePost">Delete</button>
        </div>
      </w-card>
    </div>
  </template>
  

<script>
  export default {
      props: {
          title: String,  // Prop to receive the title for the list row
          id: String,     // Prop to receive the unique ID for the list row
      },
      methods: {
          // Method to trigger the edit action and emit an event to the parent component
          editRow() {
              window.scrollTo(0, 0);  // Scroll to the top of the page
              this.$emit('toggleShow', this.id); // Emit the 'toggleShow' event with the row ID as data
          },
          // Method to trigger the remove action and emit an event to the parent component
          removePost() {
              this.$emit('removePost', this.id); // Emit the 'removePost' event with the row ID as data
          },
      },
  }
</script>
  

<style scoped>
.editButton {
    margin-right: 10px;         /* Margin to the right of the edit button */
    background-color: #4cb119;  /* Background color of the edit button */
}

.deleteButton {
    background-color: #ef270d;  /* Background color of the delete button */
}

button {
    padding: 10px 26px;         /* Padding for all buttons */
    border-radius: 5px;        /* Border radius for all buttons */
    font-size: 13px;           /* Font size for all buttons */
    margin: 0px 2px;           /* Margin around all buttons (left and right) */
}

.list-row {
    margin-bottom: 8px;        /* Margin at the bottom of the list rows */
}
</style>
