<template>
  <div class="getInTouch">
      <w-card class="map-content">
        <h1 class="pageTitle">{{pageTitle}}</h1>
        <ContactForm></ContactForm>
      </w-card>
  </div>
</template>


<script setup>
import ContactForm from '@/components/public/forms/ContactForm.vue';
var pageTitle = "Get in touch"
</script>


<style scoped>

.map-content{
margin-top: 100px;
margin-left: 100px;
margin-right: 100px;
}

/* .pageTitle{
font-size: 60px;
} */
</style>
