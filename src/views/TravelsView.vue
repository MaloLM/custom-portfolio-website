<template>
  <div class="travels">
      <w-card class="map-content">
        <h1 class="pageTitle">{{pageTitle}}</h1>

        <br><br>
        <h1 class="information"> Coming soon...</h1>
      </w-card>
  </div>
</template>


<script setup>
  var pageTitle = "Travels"
</script>


<style scoped>

  .map-content{
  margin-top: 30px;
  padding-bottom: 90%;
  margin-left: 30px;
  margin-right: 30px;
  background-color: rgba(255, 255, 255, 1);
  }

  .information{
    text-align: center;
    text-decoration: underline;
  }

  .dark .w-card {
  background-color: black;
 }

  /* .pageTitle{
  font-size: 60px;
} */
</style>
  