<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <!-- Admin view container -->
  <div class="admin">
    <!-- Main content card -->
    <w-card class="main-content">
      <!-- Admin title -->
      <h1 style="float:left">{{ title }}</h1>
      <!-- Logout button -->
      <button @click="signOut" class="logOutButton" style="float:right">Logout</button>
      <!-- Spacing for AdminTabs component -->
      <div class="spacing">
        <AdminTabs></AdminTabs>
      </div>
    </w-card>
  </div>
</template>

<script>
  // Import necessary components and services
  import AdminTabs from '@/components/admin/AdminTabs.vue';
  import databaseService from '../services/databaseService';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  export default {
    name: "admin-view",
    components: { AdminTabs },
    data() {
      return {
        title: 'Admin',
        router: useRouter(),
        store: useStore()
      };
    },
    methods: {
      // Method for signing out
      signOut() {
        try {
          databaseService.signOut();
          this.router.push('/');
        } catch (err) {
          console.log(err);
        }
      }
    },
    mounted() {
      // Check if the user is authenticated, otherwise, redirect to home
      if (!databaseService.isUserAuthenticated()) {
        this.router.push('/');
      }
    },
  };
</script>

<style scoped>
/* Styles for the admin view */

.admin {
  height: 100vh; /* Set the admin view height to 100% of the viewport height */
}

.w-card {
  background-color: rgba(255, 255, 255, 1); /* Card background color */
}

/* Dark theme styles */
.dark .w-card {
  background-color: rgba(66, 66, 66, 1); /* Dark mode background color */
}

.logOutButton {
  font-weight: bold; /* Bold font for logout button */
  background-color: #ef270d; /* Red background color for logout button */
  margin-right: 10px; /* Margin on the right side of the button */
}

.spacing {
  margin-top: 50px; /* Margin spacing at the top */
}
</style>
