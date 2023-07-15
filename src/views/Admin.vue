<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the MIT License
https://opensource.org/licenses/MIT
-->

<template>
  <div class="admin">
    <w-card class="main-content">
        <h1 style="float:left"> {{ title }} </h1> 
        <button @click="signOut" class="logOutButton" style="float:right">Logout</button>
      <div class="spacing">
        <AdminTabs></AdminTabs>
      </div>
    </w-card>  
  </div>
</template>


<script>
  import AdminTabs from '@/components/admin/AdminTabs.vue';
  import databaseService from '../services/databaseService';
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

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
      signOut(){
        try{
          databaseService.signOut()
          this.router.push('/')
        }
        catch(err){
          console.log(err)
        }
      }
    },
    mounted() {
      if(!databaseService.isUserAuthenticated() ){
        this.router.push('/')
      }
    },
  };
  </script>


<style scoped>  
.admin{
  height: 100vh;
}

.w-card {
  background-color: rgba(255, 255, 255, 1);
}
.dark .w-card {
  background-color: rgba(66, 66, 66, 1);
 }

.logOutButton{
  font-weight: bold;
  background-color: #ef270d;
  margin-right: 10px;
}

.spacing{
  margin-top: 50px;
}
</style>