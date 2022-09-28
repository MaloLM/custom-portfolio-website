<template>
  <div class="admin">
    <w-card class="main-content">
      <br> 
      <h1> {{ title }}</h1>
      <br> 
      <AdminTabs></AdminTabs>
    </w-card>  
  </div>
</template>


<script>
  import AdminTabs from '@/components/admin/AdminTabs.vue';
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  export default {
    name: "about-me-view",
    components: { AdminTabs, },
    data() {
      return {
        title: 'Admin'
      };
    },
    methods: {
   
    },
    mounted() {
      const store = useStore()
      const router = useRouter()

      const user_status = store.getters.status

      if(user_status != true){
        router.push('/')
      }
    },

  };
  </script>


<style scoped>  

.main-content { 
    background-color: rgba(255, 255, 255, 1);
}

.dark .w-card {
  background-color: black;
 }
</style>