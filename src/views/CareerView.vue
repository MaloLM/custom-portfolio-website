<template>
  <div class="main-content">
    <h1 class="pageTitle">{{ mainTitle }}</h1>

    <div class="container">
      <div class="row-1-1">
        <p class="description">{{text}}</p>
      </div>
      <div class="row-1-2" style="display: flex; justify-content: center;">
        <w-image
            class="mr5"
            :src="`${baseUrl}images/japanese-wave.png`"
            :width="150"
            :height="150">
        </w-image>
      </div>
    </div>
    <br>
    <div class="row-3">
        <h1>Job experience</h1>
        <CardCaroussel></CardCaroussel>
      </div>
      <div class="row-4">
        <h1>Professionnal projects </h1>
        <CardCaroussel></CardCaroussel>
      </div>
      <div class="row-5">
        <h1>Education </h1>
        <CardCaroussel></CardCaroussel>
      </div>
  </div>
</template>


<script setup>
  import CardCaroussel from '@/components/public/card-caroussel.vue';
  var mainTitle = "Career"
  var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  var baseUrl = 'https://antoniandre.github.io/wave-ui/'
  </script>
  
  
  <style scoped>
  .pageTitle{
    font-size: 60px;
  }

  .container {
  display: grid; 
  grid-auto-flow: row dense; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "row-1-1 row-1-2"; 
}
.row-1-1 { grid-area: row-1-1; }
.row-1-2 { grid-area: row-1-2; }

.description{
  font-size: 18px;
}

</style>
  