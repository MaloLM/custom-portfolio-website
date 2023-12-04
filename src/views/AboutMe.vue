<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <div class="aboutMe">
    <!-- Main content of the "About Me" section -->
    <div class="main-content" v-if="dialog.show != null && dialog.show != true">
      <!-- Display a mobile image if available -->
      <img class="mobile-image" v-if="image != null && image != ''" v-bind:src="image" />

      <!-- Container for displaying personal information -->
      <div>
        <div class="container">
          <!-- Display first name and last name with a line break for mobile view -->
          <h1 class="pageTitle">{{ firstName }} <br class="linebreak" /> {{ lastName }}</h1>

          <!-- Display a description -->
          <p class="description">{{ description }}</p>

          <!-- Placeholder for a desktop image -->
          <div class="void">
            <w-image :src="`${image}`" class="desktop-image" width="280px" height="260px"></w-image>
          </div>
        </div>
      </div>
      <br />
    </div>

    <!-- Display a carousel of "Personnal projects" if available -->
    <CardCaroussel title="Personnal projects" v-if="personnalProjectsPosts != null" :posts="personnalProjectsPosts" showMore="true"></CardCaroussel>

    <!-- Display a carousel of "Hobbies and interests" if available -->
    <CardCaroussel title="Hobbies and interests" v-if="hobbiesAndInterestsPosts != null" :posts="hobbiesAndInterestsPosts" showMore="false"></CardCaroussel>

    <!-- Loading dialog component -->
    <w-dialog :model-value="dialog.show == true" :fullscreen="loadingFullscreen">
      <div class="loading-dialog-content">
        <!-- Display a progress circle -->
        <w-progress class="ma1 dialog-progress" circle :model-value="undefined"></w-progress>
        
        <!-- Display a loading message -->
        <h2 class="dialog-text">Loading experience</h2>
      </div>
    </w-dialog>
  </div>
</template>


<script>
import CardCaroussel from '@/components/public/Card-caroussel.vue'; // Importing the CardCaroussel component.
import databaseService from '@/services/databaseService'; // Importing the databaseService module.
import { useStore } from 'vuex'; // Importing the useStore function from Vuex.

export default {
  name: "about-me-view", // Name of the Vue component.
  components: { CardCaroussel }, // Registering the CardCaroussel component for use in this component.

  data() {
    return {
      store: useStore(), // Initializing Vuex store.
      firstName: null, // Initializing data properties.
      lastName: null,
      description: null,
      image: null,
      personnalProjectsPosts: null,
      hobbiesAndInterestsPosts: null,
      loadingFullscreen: true,
      windowWidth: null,
      dialog: {
        show: null,
      },
    };
  },

  methods: {
    sortByCreationDate(posts) {
      // Function to sort an array of posts by creation date.
      let array = [];

      // Loop through the posts and add an 'id' property to each post.
      Object.entries(posts).forEach(([key, value]) => {
        value['id'] = key;
        array.push(value);
      });

      // Sort the array in descending order of 'createdAt' property.
      array = array.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      return array;
    },
  },

  created() {
    // Lifecycle hook called when the component is created.
    this.dialog.show = this.store.getters.showDialog; // Setting the 'show' property of the 'dialog' object from Vuex store.
  },

  mounted() {
    // Lifecycle hook called when the component is mounted.
    // Retrieving data from the databaseService for various properties.

    databaseService.getAboutMeOrCareerData('about-me', 'firstName').on('value', (snapshot) => {
      this.firstName = snapshot.val();
      databaseService.getAboutMeOrCareerData('about-me', 'lastName').on('value', (snapshot) => {
        this.lastName = snapshot.val();
        databaseService.getAboutMeOrCareerData('about-me', 'description').on('value', (snapshot) => {
          this.description = snapshot.val();
          databaseService.getAboutMeOrCareerData('about-me', 'image').on('value', (snapshot) => {
            this.image = snapshot.val();

            databaseService.getPersonnalProjects().on('value', (snapshot) => {
              // Retrieving personal projects data.
              let posts = this.sortByCreationDate(snapshot.val());
              this.personnalProjectsPosts = posts;

              databaseService.getHobbiesAndInterests().on('value', (snapshot) => {
                // Retrieving hobbies and interests data.
                let posts = this.sortByCreationDate(snapshot.val());
                this.hobbiesAndInterestsPosts = posts;

                this.store.commit('SET_SHOW_DIALOG', false); // Committing a Vuex mutation.
                this.dialog.show = false; // Setting 'show' property to false.

              }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
              });
            }, (errorObject) => {
              console.log('The read failed: ' + errorObject.name);
            });
          }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
          });
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
/* Styles for a loading dialog and responsive layout */

.loading-dialog-content {
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Center content vertically in the viewport */
}

.dialog-text {
  font-size: 30px; /* Font size for the dialog text */
}
  
.container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1.2fr 0.8fr; 
  grid-template-rows: 0.3fr 0.3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "pageTitle void"
    "description void"; /* Define a grid layout with two rows and two columns */
}

.pageTitle { grid-area: pageTitle; } /* Define the grid area for pageTitle */

.description { 
  grid-area: description; /* Define the grid area for description */
  font-weight: 500; /* Font weight for description */
  color: rgb(77, 77, 77); /* Text color */
  float: left; /* Float the description text to the left */
  font-size: 25px; /* Font size for description */
  text-align: left; /* Text alignment to the left */
  margin: 0;
  margin-left: 15px; /* Left margin for description */
 }

/* Dark mode styles for description */
.dark .description {
  color: rgb(206, 205, 205); /* Color for dark mode */
 }

.void { 
  grid-area: void;
  margin: auto; /* Center content within the grid area */
}

.mobile-image {
  display: none; /* Initially hide mobile-image */
  pointer-events: none;
}

.desktop-image {
  pointer-events: none; /* Disable pointer events for desktop-image */
}

.linebreak {
  display: none; /* Initially hide linebreak */
}

@media (max-width: 667px) {
  /* Media query for screens with a maximum width of 667px (typically mobile devices) */

  .linebreak {
    display: block; /* Show linebreak for mobile view */
  }

  .container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1.2fr 0fr; 
  grid-template-rows: 0.3fr 0.3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "pageTitle void"
    "description void"; /* Adjust grid layout for mobile view */
  }

  .pageTitle{
    text-align: center; /* Center-align pageTitle text */
    width: 100%; /* Full width for pageTitle */
    font-size: 50px; /* Larger font size for mobile view */
    margin: 10px 0px; /* Adjust margin for mobile view */
  }

  .description {
    width: 90%; /* Adjust width for mobile view */
    text-align: left; /* Left-align description text */
    font-size: 20px; /* Smaller font size for mobile view */
  }

  .void {
    display: none; /* Hide void for mobile view */
  }

  .main-content{
    margin-top: 15px; /* Adjust top margin for mobile view */
    margin-left: 12px; /* Adjust left margin for mobile view */
    margin-right: 12px; /* Adjust right margin for mobile view */
    margin-bottom: 0px;
    transition: 0.3s; /* Add a transition effect for main-content */
  }   
   
  .mobile-image {
    pointer-events: none;
    display: block; /* Show mobile-image for mobile view */
    margin-left: auto;
    margin-right: auto; /* Center-align mobile-image */
    width: 70%; /* Adjust width for mobile view */
    margin-bottom: 15px; /* Adjust margin for mobile view */
  }

  .dialog-text {
    margin: 10px; /* Adjust margin for mobile view */
    font-size: 24px; /* Adjust font size for mobile view */
  }
}
</style>
