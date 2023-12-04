<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <!-- Main content container, displayed conditionally based on dialog state -->
  <div class="main-content" v-if="dialog.show != null && dialog.show != true">
    <!-- Page title -->
    <h1 class="pageTitle">{{ title }}</h1>
    <!-- Container for description -->
    <div class="container">
       <p class="description">{{ description }}</p>
    </div>
  </div>

  <!-- Section for displaying job experiences with a carousel -->
  <div class="row-3">
    <CardCaroussel title="Job experience" :posts="jobExperiences" showMore="true"></CardCaroussel>
  </div>
  <!-- Section for displaying professional projects with a carousel -->
  <div class="row-4">
    <CardCaroussel title="Professionnal projects" :posts="professionalProjects" showMore="true"></CardCaroussel>
  </div>
  <!-- Section for displaying education details with a carousel -->
  <div class="row-5">
    <CardCaroussel title="Education" :posts="education" showMore="true"></CardCaroussel>
  </div>

  <!-- Dialog for loading experience -->
  <w-dialog :model-value="dialog.show == true" :fullscreen="loadingFullscreen">
    <div class="loading-dialog-content">
      <!-- Circular progress bar -->
      <w-progress class="ma1 dialog-progress" circle :model-value="undefined"></w-progress>
      <!-- Text displayed during loading -->
      <h2 class="dialog-text">Loading experience</h2>
    </div>
  </w-dialog>
</template>


<script>
// Importing necessary components and services
import CardCaroussel from '@/components/public/Card-caroussel.vue';
import databaseService from '@/services/databaseService';
import { useStore } from 'vuex';

export default {
  name: "career",
  components: {
      CardCaroussel, // Registering the CardCaroussel component
    },
  data() {
    return {
      store: useStore(), // Accessing the Vuex store
      title: null, // Title for the career section
      description: null, // Description for the career section
      image: null, // Image for the career section
      jobExperiences: null, // Data for job experiences
      professionalProjects: null, // Data for professional projects
      education: null, // Data for education
      loadingFullscreen: true, // State for fullscreen loading dialog
      dialog: {
        show: null, // State to control dialog visibility
      }
    };
  },
  methods: {
    // Method to sort posts by creation date
    sortByCreationDate(posts) {
      let size = Object.keys(posts).length;
      if(size > 0) {
        let array = []
        Object.entries(posts).forEach(([key, value]) => {
              value['id'] = key
              array.push(value)
        })
        array = array.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        return array
      } else {
        console.log("error: empty object")
      }
    }
  },
  created() {
    // Setting dialog state on component creation
    this.dialog.show = this.store.getters.showDialog;
  },
  mounted() {
    // Fetching data from the database on component mount
    databaseService.getAboutMeOrCareerData('career','title').on('value', (snapshot) => {
      this.title = snapshot.val()

      databaseService.getAboutMeOrCareerData('career','description').on('value', (snapshot) => {
        this.description = snapshot.val()

        databaseService.getAboutMeOrCareerData('career','image').on('value', (snapshot) => {
          this.image = snapshot.val()

          databaseService.getJobExperiences().on('value', (snapshot) => {
            
            let posts = this.sortByCreationDate(snapshot.val())
            this.jobExperiences = posts

            databaseService.getProfessionalProjects().on('value', (snapshot) => {
              
              let posts = this.sortByCreationDate(snapshot.val())
              this.professionalProjects  = posts

              databaseService.getEducation().on('value', (snapshot) => {

                let posts = this.sortByCreationDate(snapshot.val())
                this.education  = posts

                this.store.commit('SET_SHOW_DIALOG', false)
                this.dialog.show = false
                
                // Handling errors for each database call
              }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });
            }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });
          }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });
        }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });
      }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 
    }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });        
  },
};
</script>
  
  
<style scoped>
/* Styling for loading dialog content */
.loading-dialog-content {
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Styling for dialog text */
.dialog-text {
  font-size: 30px;
}

/* Grid container styling */
.container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 0.6fr 0.3fr; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: "description void"; 
}

/* Styling for description area in the grid */
.description { 
  grid-area: description;
  font-size: 25px;
  font-weight: 500;
  text-align: left;
  margin: 0;
  margin-left: 15px;
 }

/* Style for void area in the grid */
.void { 
  grid-area: void;
}

/* Styling for elements in row-3 */
.row-3 {
  margin-top: 25px;
}

/* Responsive styling for smaller screens */
@media (max-width: 667px) {
  /* Adjustments to page title in smaller screens */
  .pageTitle{
    text-align: center;
    font-size: 50px;
  }

  /* Adjustments to main content area in smaller screens */
  .main-content{
    margin-top: 15px;
    margin-left: 12px;
    margin-right: 12px;
    transition: 0.3s;
  }   

  /* Adjustments to grid container in smaller screens */
  .container {
    display: grid; 
    grid-auto-columns: 1fr; 
    grid-template-columns: 1fr 0fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: "description void"; 
  }

  /* Hide the void area in smaller screens */
  .void {
    display: none;
  }

  /* Adjustments to dialog text styling in smaller screens */
  .dialog-text {
    margin: 10px;
    font-size: 24px;
  }
}
</style>
