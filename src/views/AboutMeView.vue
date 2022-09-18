<template>
  <div class="aboutMe">
    <div class="main-content">
      <div>
        <h1 class="pageTitle">{{ mainTitle }}</h1>
        <div>
          <p>{{text}}</p>
          <img/>
        </div>
        <br/>
      </div>
      <h1>Personnal projects</h1>

      <CardCaroussel></CardCaroussel>

      <h1>Hobbies and interests</h1>

      <CardCaroussel></CardCaroussel>
      
    </div>
  </div>
</template>


<script setup>
import CardCaroussel from '@/components/public/card-caroussel.vue';
var mainTitle = "Malo Le Mestre"
var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
</script>

<style scoped>
.pageTitle{
  font-size: 60px;
}

</style>
