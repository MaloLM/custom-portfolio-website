<template>
  <div class="admin">
    <w-card class="main-content">
      <div>
        <h1 style="float:left"> {{ title }}</h1> 
        <button @click="signOut" class="logOutButton" style="float:right">Logout</button>
      </div>
      <div class="spacing">
        <AdminTabs ></AdminTabs>
      </div>
    </w-card>  
  </div>
</template>


<script>
  import AdminTabs from '@/components/admin/AdminTabs.vue';
  import DatabaseService from '../services/databaseService';
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  export default {
    name: "admin-view",
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
.admin{
  height: 100vh;
}

.w-card {
  background-color: rgba(255, 255, 255, 1);
}
.dark .w-card {
  background-color: black;
 }

.logOutButton{
  font-weight: bold;
  background-color: #ef270d;
  margin-right: 10px;
  color: white;
  border-radius: 20px;
  font-size:10px;
}

.spacing{
  margin-top: 70px;
}
</style>