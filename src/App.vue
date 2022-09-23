<template>

  <w-app>
    <nav>
      <router-link to="/" class="link">About me </router-link> 
      <router-link to="/career" class="link">Career </router-link> 
      <router-link to="/travels" class="link">Travels </router-link>
      <router-link to="/get-in-touch" class="link">Get in touch </router-link> 
      
      <div style="float:right">
        <DarkThemeButton style="float:left" />
        <w-icon class="paramButton" 
          xl
          style="float:right; margin-left: 8px;" 
          @click="updateOverlayState"
          color="grey-light4">
          fa fa-cog
         </w-icon>
      </div>
    </nav>
    <router-view/>
  </w-app>

  <w-dialog
      width="30%"
      class="dialog"
      v-model="showDialog"
      title="Authentication">
      <AuthenticationView></AuthenticationView>
  </w-dialog>
  
</template>

<script setup>
  import {ref } from 'vue'
  import 'font-awesome/css/font-awesome.min.css'
  import DarkThemeButton from "./components/public/DarkThemeButton.vue";
  import AuthenticationView from './components/public/forms/AuthenticationForm.vue';

  var showDialog = ref(false)

  function updateOverlayState(){
    console.log(showDialog)

    if(!showDialog.value){
      showDialog.value = true
    }
  }
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
