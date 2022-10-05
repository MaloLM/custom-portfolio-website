<template>
  <div class="getInTouch">
      <w-card class="main-content">
        <h1 class="pageTitle">{{pageTitle}}</h1>
        <ContactForm></ContactForm>
      </w-card>
  </div>
</template>


<script setup>
import ContactForm from '@/components/public/ContactForm.vue';
var pageTitle = "Get in touch"
</script>


<style scoped>
.main-content{
  margin-top: 100px;
  margin-left: 100px;
  margin-right: 100px;
  background-color: rgba(255, 255, 255, 1);
}

.dark .main-content{
  background-color: rgb(197, 29, 29);
}

.getInTouch{
  height: 100vh;
}

.dark .w-card {
  background-color: black;
 }

 .pageTitle {
  margin-left: 10px;
 }
</style>
