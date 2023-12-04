<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <!-- Form element to handle CV file upload -->
    <form @submit.prevent="uploadCV()">
  
      <!-- Card component with upload instructions -->
      <w-card
        title="Upload CV - pdf file only"
        title-class="grey"
        bg-color="grey-light5"
      >
        <!-- Input field for selecting a PDF file -->
        <input
          type="file"
          ref="file"
          @change="readFile()"
          accept=".pdf"
          id="choose-file"
          bg-color="grey-light5"
          name="choose-file"
          required
        />
  
        <!-- Display the filename if a file is selected -->
        <div v-if="file">
          <h3>{{ filename }}</h3>
        </div>
      </w-card>
  
      <br />
  
      <!-- Submit button -->
      <div style="float: right;">
        <button>Submit</button>
      </div>
    </form>
  
    <br />
    <br />
    <br />
  
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
data() {
        return {
        showSuccessAlert: false, // Control flag for displaying success alert
        showErrorAlert: false,   // Control flag for displaying error alert
        isCV: null,              // Flag to indicate if the selected file is a CV
        filename: null,          // Name of the selected file
        file: null,              // Reference to the selected file
        };
    },
    props: {
        formType: String, // Prop to specify the form type
    },
    methods: {
        // Method to read the selected file and determine if it's a CV
        readFile() {
        this.file = this.$refs.file.files[0];

        if (this.file) {
            if (this.file.name.includes(".pdf")) {
            this.filename = this.file.name;
            this.isCV = true;
            } else {
            this.isCV = false;
            this.filename = false;
            }
        } else {
            this.showErrorAlert = true;
        }
        },
        // Method to upload the CV to the database
        uploadCV() {
        try {
            if (this.file != null && this.filename != null) {
            let filename = this.filename;
            if (this.confirmEnding(filename, '.pdf')) {
                filename = filename.replace(/.pdf+$/, '');
            }
            // Call the database service to upload the CV
            databaseService.uploadCurriculumVitae(this.file, filename);
            this.showSuccessAlert = true;
            }
        } catch (err) {
            this.showErrorAlert = true;
        }
        },
        // Method to confirm the ending of a string with a target string
        confirmEnding(string, target) {
        return string.substr(-target.length) === target;
        },
    },
};
</script>
  


<style scoped>
  /* Apply a top margin of 20px to all <form> elements within this component */
  form {
    margin-top: 20px;
  }

  /* Apply margin of 20px to all <w-alert> elements within this component */
  w-alert {
    margin: 20px;
  }
</style>
