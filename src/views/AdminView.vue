<template>
  <div class="admin">
    <w-card class="main-content">
      <br> 
      <div>
        <h1 style="float:left"> {{ title }}</h1> 
        <button @click="signOut" class="logOutButton" style="float:right">Logout</button>
      </div>
      <br>
      <br> <br>
      <br> 
      <AdminTabs></AdminTabs>
    </w-card>  
  </div>
</template>


<script>
  import AdminTabs from '@/components/admin/AdminTabs.vue';
  import DatabaseService from '../services/databaseService';
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  export default {
    name: "about-me-view",
    components: { AdminTabs, },
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
          DatabaseService.signOut()
          this.router.push('/')
        }
        catch(err){
          console.log(err)
        }
      }
    },
    mounted() {
      if(!DatabaseService.isUserAuthenticated() ){
        this.router.push('/')
      }
    },

  };
  </script>


<style scoped>  
.main-content { 
    background-color: rgba(255, 255, 255, 1);
}

.admin{
  height: 100vh;
}

.dark .w-card {
  background-color: black;
 }

 .logOutButton{
    background-color: #ac1111;
    margin-right: 10px;
    color: white;
    border-radius: 20px;
    font-size:10px;
}
</style>