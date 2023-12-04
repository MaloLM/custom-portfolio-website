<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <w-app>
    <!-- Navigation bar -->
    <nav id="navbar">
      <!-- Mobile burger menu icon -->
      <w-icon
        v-show="mobile"
        @click="openDrawer = 'left'"
        class="burgerMenu"
        xl
        style="float: left; margin-left: 8px;"
        color="grey-light4"
      >
        fa fa-bars
      </w-icon>

      <!-- Links for desktop view -->
      <router-link to="/" class="link" v-show="!mobile">About me</router-link>
      <router-link to="/career" class="link" v-show="!mobile">Career</router-link>
      <router-link to="/contact" class="link" v-show="!mobile">Get in touch</router-link>
      <a class="link linkButton" @click="downloadCV" v-show="!mobile">Get my CV</a>

      <div style="float: right">
        <!-- Dark theme button -->
        <DarkThemeButton style="float: left" />
        
        <!-- Settings icon (only shown when not on the admin page) -->
        <router-link to="/authentication" class="link" v-show="!mobile">
          <w-icon
            class="paramButton"
            v-if="path !== '/admin'"
            xl
            style="float: right; margin-left: 8px;"
            color="grey-light4"
          >
            fa fa-cog
          </w-icon>
        </router-link>
      </div>
    </nav>

    <!-- Router view to display the active component -->
    <router-view :key="$route.fullPath" />

    <!-- Mobile navigation drawer -->
    <w-drawer
      v-model="openDrawer"
      :[position]="true"
      bg-color="grey-dark5"
    >
      <!-- Mobile navigation menu -->
      <nav class="navMenu">
        <!-- Mobile burger menu icon -->
        <w-icon
          v-show="mobile"
          @click="toggleMobileNav"
          class="burgerMenu"
          xl
          style="float: left; margin-left: 8px;"
          color="grey-light4"
        >
          fa fa-bars
        </w-icon>

        <!-- Links for mobile view -->
        <router-link to="/" class="link" @click="toggleMobileNav">About me</router-link>
        <router-link to="/career" class="link" @click="toggleMobileNav">Career</router-link>
        <router-link to="/contact" class="link" @click="toggleMobileNav">Get in touch</router-link>
        <a class="link linkButton" @click="downloadCV">Get my CV</a>

        <!-- Sign-in link for mobile view -->
        <router-link to="/authentication" v-show="!mobile" class="link" @click="toggleMobileNav">Sign-in</router-link>
      </nav>
    </w-drawer>
  </w-app>
</template>


<script>
  // Importing necessary dependencies and components
  import 'font-awesome/css/font-awesome.min.css'; // Importing Font Awesome CSS
  import DarkThemeButton from "./components/public/DarkThemeButton.vue"; // Importing DarkThemeButton component
  import { useRoute } from 'vue-router'; // Importing useRoute from Vue Router
  import { computed } from 'vue'; // Importing computed from Vue
  import axios from 'axios'; // Importing Axios for HTTP requests
  import databaseService from './services/databaseService'; // Importing the databaseService module

  export default {
    components: {
      DarkThemeButton // Registering the DarkThemeButton component
    },
    data: () => {
      return {
        path: computed(() => useRoute().path), // Getting the current route path
        mobile: null, // Variable to track if the application is on a mobile device
        windowWidth: null, // Variable to store the window width
        openDrawer: false, // Variable to control the mobile navigation drawer
        pageTitle: "Malo Le Mestre", // Title for the web page
      }
    },
    computed: {
      position() {
        return this.openDrawer || 'left'; // Compute the position for the mobile navigation drawer
      }
    },
    created() {
      // Lifecycle hook called when the component is created
      this.checkScreen(); // Initial check of the screen size
      document.title = this.pageTitle; // Set the document title
      window.addEventListener('resize', this.checkScreen); // Add an event listener for window resize
    },
    methods: {
      toggleMobileNav() {
        // Method to toggle the mobile navigation drawer
        this.openDrawer = !this.openDrawer;
      },
      checkScreen() {
        // Method to check the screen size and determine if it's a mobile device
        this.windowWidth = window.innerWidth; // Get the window width
        if (this.windowWidth < 750) {
          this.mobile = true; // Set mobile to true for small screens
          return;
        }
        this.mobile = false; // Set mobile to false for larger screens
        this.openDrawer = false; // Close the mobile navigation drawer for larger screens
        return;
      },
      downloadCV() {
        // Method to download the curriculum vitae (CV)
        databaseService.getCurriculumVitaeLink().on('value', (snapshot) => {
          // Retrieve the CV link from the database
          let cvLink = snapshot.val();

          // Make an HTTP GET request to the CV link and handle the response
          axios({
            url: cvLink,
            method: 'GET',
            responseType: 'blob', // Response type is blob (binary data)
          }).then((response) => {
            // Create a downloadable link for the CV
            let fileURL = window.URL.createObjectURL(new Blob([response.data]));
            let fURL = document.createElement('a');

            fURL.href = fileURL;
            fURL.setAttribute('download', 'malo_le_mestre_CV.pdf'); // Set the download attribute
            document.body.appendChild(fURL); // Append the link to the document

            fURL.click(); // Trigger a click event to initiate the download
          });
        });
      }
    }
  }
</script>


<style>
/* General styles for the entire application */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  transition: 0.3s;
  background-color: #ffffff;
  background-image: url("assets/white-theme-bckground.png");
  background-size: 102%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Styles for the main content */
.main-content {
  margin: 25px 70px;
  transition: 0.3s;
}

/* Light theme styles */
.light #app {
  background-color: white;
  background-image: url("assets/white-theme-bckground.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 102%;
  color: #2c3e50;
  transition: 0.3s;
}

/* Dark theme styles */
.dark #app {
  background-color: rgb(57, 57, 57);
  color: rgb(206, 205, 205);
  background-image: url("assets/dark-theme-bckground.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 102%;
  transition: 0.3s;
}

.dark .w-card {
  border-style: solid;
  border-color: rgba(166, 166, 166, 0.5);
}

/* Styles for the navigation bar */
nav {
  padding: 20px;
  background-color: rgb(47, 47, 47);
  border-color: #070707;
  border: 2px solid;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-bottom-color: rgb(36, 35, 35);
  border-left-width: 0px;
  width: 100vw;
}

/* Styles for page titles and descriptions */
.pageTitle {
  font-size: 60px;
}

.description {
  font-size: 18px;
}

/* Styles for navigation links */
nav a {
  font-weight: bold;
  color: #e3e1e1;
}

nav a.router-link-exact-active {
  color: #b3b3b3;
}

/* Styles for link buttons */
.linkButton {
  cursor: pointer;
}

.link {
  padding-right: 27px;
}

/* Styles for the navigation menu */
.navMenu {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
}

.navMenu .link {
  margin-top: 20px;
  font-size: 30px;
}

/* Styles for generic buttons */
button {
  background-color: #2d467d;
  border: 0;
  padding: 10px 40px;
  margin-top: 0px;
  color: white;
  border-radius: 20px;
  font-size: 13px;
}

/* Media query for smaller screens */
@media (max-width: 667px) {
  #app {
    background-image: none;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .light #app {
    background-image: none;
    background-color: rgba(234, 234, 234, 0.9);
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: #2c3e50;
    transition: 0.3s;
  }

  .dark #app {
    background-color: rgba(50, 50, 50, 0.9);
    color: rgb(206, 205, 205);
    background-image: none;
    background-repeat: no-repeat;
    background-attachment: fixed;
    transition: 0.3s;
  }
}
</style>
