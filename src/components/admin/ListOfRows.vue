<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <!-- Container for a list of rows -->
  <div class="list-of-rows">
    <!-- Display when isShow is true -->
    <div v-if="isShow">
      <!-- Button to add a new item -->
      <button @click="isShow = !isShow">Add new</button>

      <!-- Render ListRow component for each post -->
      <ListRow
        @toggleShow="toggleShow($event)"
        @removePost="removePost($event)"
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title">
      </ListRow>
    </div>

    <!-- Display when isShow is false -->
    <div v-if="!isShow">
      <!-- Render MainForm component for editing or adding -->
      <MainForm
        @toggleShow="toggleShow($event)"
        :id="postToEditId"
        :formType="formType">
      </MainForm>
    </div>
  </div>
</template>



<script>
import ListRow from "./Row.vue";      // Import the ListRow component
import MainForm from './forms/MainForm.vue';  // Import the MainForm component
import databaseService from '@/services/databaseService';  // Import the databaseService

export default {
  data() {
    return {
      postToEditId: null,  // Initialize a variable to store the ID of the post being edited
      isShow: true,       // Initialize a variable to control the visibility of content
      posts: null,        // Initialize a variable to store post data
    }
  },
  components: {
    ListRow,             // Register the ListRow component
    MainForm,            // Register the MainForm component
  },
  props: {
    formType: String    // Declare a prop named 'formType' of type String
  },
  setup() {
    // The setup function is empty in this component
  },
  methods: {
    toggleShow(postId) {
      // Toggle the visibility of content and set the postToEditId based on the provided postId
      if (postId == "null") {
        this.postToEditId = null;
      } else {
        this.postToEditId = postId;
      }
      this.isShow = !this.isShow;
    },
    removePost(id) {
      // Call a method from databaseService to remove a post based on the provided id
      databaseService.removePost(this.formType, id);
    }
  },
  mounted() {
    // Fetch posts from the database using databaseService and update 'posts' when data is received
    databaseService.getPosts(this.formType).on('value', (snapshot) => {
      this.posts = snapshot.val();
      let indexes = Object.keys(this.posts);
      if (indexes.length) {
        indexes.forEach(element => {
          this.posts[element]['id'] = element; // Add 'id' property to each post object
        });
      }
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    });
  }
}
</script>


<style scoped>
  /* Base styles for buttons */
  button {
    padding: 10px 26px;        /* Set padding for buttons */
    border-radius: 5px;        /* Apply a rounded border to buttons */
    margin-bottom: 15px;      /* Add bottom margin to create spacing between buttons */
    margin-top: 15px;         /* Add top margin to create spacing between buttons */
  }

  /* Additional styles for buttons with the 'dark' class */
  .dark button {
    border-style: solid;                           /* Set border style to solid */
    border-color: rgba(166, 166, 166, 0.5);       /* Set border color with transparency */
  }
</style>
