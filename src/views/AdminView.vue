<template>
  <div class="admin">
    <br> 
    <w-card class="main-content">
      <h1> {{ viewTitle }}</h1>
      <br> 
      <AdminTabs>
      
      </AdminTabs>
    </w-card>
   
    
  </div>
</template>


<script setup>

// import AboutMeFormVue from '@/components/admin/forms/AboutMeForm.vue';
import { ref } from 'vue'
import AdminTabs from '@/components/admin/AdminTabs.vue';

const viewTitle = ref('Admin')

</script>


<style scoped>  

.main-content { 
    background-color: rgba(255, 255, 255, 1);
}

.dark .w-card {
  background-color: black;
 }
</style>