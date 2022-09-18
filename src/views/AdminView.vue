<template>
  <div class="admin">
    <w-card class="main-content">
      <h1> {{ viewTitle }}</h1>
      <w-tabs :items="tabs" card :fill-bar="fillBar"></w-tabs>
    </w-card>
  </div>
</template>


<script setup>

// import AboutMeFormVue from '@/components/admin/forms/AboutMeForm.vue';
import { ref } from 'vue'

const viewTitle = ref('Admin')

const tabs = [
      { title: 'About me', content: "aboutme"},
      { title: 'Hobbies', content: 'TODO.' },
      { title: 'Personnel projects', content: 'TODO' },
      { title: 'Career', content: 'TODO' },
      { title: 'Professional projects', content: 'TODO' },
      { title: 'Job experience', content: 'TODO' },
      { title: 'eductation', content: 'TODO' },
      { title: 'Travels', content: 'TODO' }
    ]
  
const fillBar = false

</script>


<style scoped>
  
</style>