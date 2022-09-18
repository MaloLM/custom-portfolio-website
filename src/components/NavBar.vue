<template>
    <nav>
      <router-link to="/" class="link">About me </router-link> 
      <router-link to="/career" class="link">Career </router-link> 
      <router-link to="/travels" class="link">Travels </router-link>
      <router-link to="/get-in-touch" class="link">Get in touch </router-link> 
      <router-link to="/admin" class="link">Admin </router-link>
      
      <!-- <w-button class="ma1 mr6" bg-color="secondary" style="float:right" round>TODO</w-button> -->
      <DarkThemeButton style="float:right"/>
    </nav>
    <router-view/>
</template>


<script setup>
import DarkThemeButton from "./public/DarkThemeButton.vue";

</script>


<style scoped>

nav {
  padding: 20px;
  background-color: black;
  border-color: #070707;
  border: 2px solid;
}

nav a {
  font-weight: bold;
  color: #e3e1e1;
}

nav a.router-link-exact-active {
  color: #b3b3b3;
}

.link {
    padding-right: 20px;
}

</style>
  