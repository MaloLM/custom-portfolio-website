<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <br />
  
    <!-- Form for submitting data -->
    <form @submit.prevent="pushForm()">
  
      <!-- Input field for the title -->
      <w-input
        class="mb3 spacing"
        outline
        label="Title"
        v-model="title"
        bg-color="grey-light5"
        required
      >
      </w-input>
  
      <!-- Textarea for the description -->
      <w-textarea
        class="mt4 spacing"
        outline
        rows="10"
        label="Description"
        v-model="description"
        bg-color="grey-light5"
        required
      >
      </w-textarea>
  
      <!-- Card for handling image upload -->
      <w-card class="spacing" title="Image" title-class="grey" bg-color="grey-light5">
        <!-- Input field for selecting an image -->
        <input
          type="file"
          ref="file"
          @change="readFile()"
          accept="image/*"
          id="choose-file"
          name="choose-file"
        />
        <div v-if="image">
          <br />
        </div>
        <!-- Display the uploaded image if available -->
        <img v-if="image" :src="preview" class="image" />
      </w-card>
  
      <!-- Submit button -->
      <div class="spacing" style="float: right;">
        <button>Submit</button>
      </div>
    </form>
  
    <!-- Alerts for success and error messages with transitions -->
    <w-transition-expand y>
      <!-- Display success alert when 'showSuccessAlert' is true -->
      <w-alert v-if="showSuccessAlert" dismiss success class="alerts">
        Data was successfully submitted
      </w-alert>
  
      <!-- Display error alert when 'showErrorAlert' is true -->
      <w-alert v-if="showErrorAlert" dismiss error>
        Data failed to get submitted
      </w-alert>
    </w-transition-expand>
  </template>
  

<script>
  import databaseService from '@/services/databaseService'; // Import the database service
  
  export default {
    props: {
      formType: String, // Prop to specify the form type
    },
    data() {
      return {
        showSuccessAlert: false, // Control flag for displaying success alert
        showErrorAlert: false,   // Control flag for displaying error alert
        title: null,             // Title input value
        description: null,       // Description textarea value
        isImage: null,           // Flag to indicate if the selected file is an image
        image: null,             // URL of the selected image
        imageFile: null,         // Reference to the selected image file
      };
    },
    setup() {},
    methods: {
      // Method to read the selected image file and determine if it's an image
      readFile() {
        this.file = this.$refs.file.files[0];
  
        if (this.file) {
          if (
            this.file.name.includes(".png") ||
            this.file.name.includes(".jpg") ||
            this.file.name.includes(".jpeg")
          ) {
            this.isImage = true;
            this.image = true;
            this.imageFile = this.file;
            this.preview = URL.createObjectURL(this.file);
          } else {
            this.image = false;
            this.isImage = false;
          }
        } else {
          this.showErrorAlert = true;
        }
      },
      // Method to submit the form data
      pushForm() {
        try {
          if (this.isImage == null && this.imageFile == null) {
            // If no image is selected, update post data
            var children = {
              title: this.title,
              description: this.description,
            };
            databaseService.updatePost(this.formType, children);
            this.showSuccessAlert = true;
          } else if (this.imageFile != null) {
            // If an image is selected, upload the image and update data
            databaseService.uploadFileThenUpdateCareer(
              this.formType,
              this.imageFile,
              this.title,
              this.description
            );
            this.showSuccessAlert = true;
          }
        } catch (err) {
          this.showErrorAlert = true;
        }
      },
    },
    mounted() {
      // Fetch initial data from the database for title, description, and image
      databaseService.getAboutMeOrCareerData(this.formType, 'title').on('value', (snapshot) => {
        this.title = snapshot.val();
  
        databaseService.getAboutMeOrCareerData(this.formType, 'description').on('value', (snapshot) => {
          this.description = snapshot.val();
  
          databaseService.getAboutMeOrCareerData(this.formType, 'image').on('value', (snapshot) => {
            this.image = snapshot.val();
            this.preview = snapshot.val();
          }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
          });
  
        }, (errorObject) => {
          console.log('The read failed: ' + errorObject.name);
        });
  
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
    },
  };
  </script>
  


<style scoped>
  /* Override default button styles */
  button {
    padding: 10px 40px;  /* Apply padding to buttons */
    margin-top: 0px;     /* Remove top margin for buttons */
  }

  /* Ensure images have a maximum width and auto-adjusted height */
  .image {
    max-width: 100%;    /* Set maximum width for images */
    height: auto;       /* Automatically adjust the image height */
  }

  /* Apply margin to elements with the 'alerts' class */
  .alerts {
    margin-right: 10px; /* Add right margin to elements with 'alerts' class */
  }

  /* Apply a margin of 20px to elements with the 'spacing' class */
  .spacing {
    margin: 20px;       /* Set a 20px margin for elements with 'spacing' class */
  }
</style>
