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
import AdminTabs from '@/components/admin/adminTabs.vue';

const viewTitle = ref('Admin')

</script>


<style scoped>      
</style>