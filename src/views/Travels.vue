<template>
  <div class="travels">
      <w-card class="map-content">
        <h1 class="pageTitle">{{title}}</h1>
        <br>
        <br>
        <h1 class="information"> Coming soon...</h1>
      </w-card>
  </div>
</template>


<script setup>
  var title = "Travels"
</script>


<style scoped>
.map-content{
  margin-top: 30px;
  padding-bottom: 30%; 
  margin-left: 30px;
  margin-right: 30px;
  background-color: rgba(255, 255, 255, 1);
}

.travels{
  height: 100vh;
}

.information{
  text-align: center;
  text-decoration: underline;
}

.dark .w-card {
  background-color: black;
}
</style>
  