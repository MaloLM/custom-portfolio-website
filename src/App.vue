<template>

  <w-app>
    <NavBar />
  </w-app>

</template>

<script setup>
  import NavBar from './components/NavBar.vue'
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  transition: 0.3s;
   /* background-image: url("assets/background.jpg"); */
   background-color: #030303;
   background-image: url("assets/diagonal-motion.jpg");
   background-repeat: no-repeat;
   background-attachment: fixed;
   
}

.main-content{
    margin-top: 50px;
    margin-bottom: 100%;
    margin-left: 70px;
    margin-right: 70px;
    transition: 0.3s;
  }

.light {
  background-color: white;
  border-color: rgb(0, 0, 0);
  background-image: url("assets/diagonal-motion.jpg");
  color:rgb(0, 0, 0);
  transition: 0.3s;
}

.dark #app {
    background-color: rgb(57, 57, 57);
    color:rgb(244, 244, 244);
    background-image: none;
    transition: 0.3s;
}
</style>
