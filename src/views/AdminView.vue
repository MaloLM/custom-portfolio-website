<template>
  <div class="admin">
    <w-card class="main-content">
      <br> 
      <h1> {{ viewTitle }}</h1>
      <br> 
      <AdminTabs></AdminTabs>
    </w-card>  
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AdminTabs from '@/components/admin/AdminTabs.vue';

const viewTitle = ref('Admin')

const store = useStore()
const router = useRouter()

const user_status = store.getters

if(user_status.user != true){ // TODO : correct user_status.user to user_status
  router.push('/')
}

</script>


<style scoped>  

.main-content { 
    background-color: rgba(255, 255, 255, 1);
}

.dark .w-card {
  background-color: black;
 }
</style>