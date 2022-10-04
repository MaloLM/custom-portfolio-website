<template>

  <head>
      <meta charset="utf-8">
      <link rel="shortcut icon" type="image/png" href="./assets/favicon.png"/>
      ...
  </head>
  <w-app >
    <nav id="navbar">
      <router-link to="/" class="link">About me </router-link> 
      <router-link to="/career" class="link">Career </router-link> 
      <router-link to="/travels" class="link">Travels </router-link>
      <router-link to="/get-in-touch" class="link">Get in touch </router-link> 
      
      <div style="float:right">
        <DarkThemeButton style="float:left" />
        <router-link to="/authentication" class="link">
          <w-icon class="paramButton" 
          v-if="path !== '/admin'"
          xl
          style="float:right; margin-left: 8px;" 
          color="grey-light4">
          fa fa-cog
         </w-icon> 
        </router-link> 
      </div>
    </nav>
    <router-view :key="$route.fullPath" />
  </w-app>
  
</template>

<!-- <script setup>
  import 'font-awesome/css/font-awesome.min.css'
  import DarkThemeButton from "./components/public/DarkThemeButton.vue";
  import {useRoute} from 'vue-router'
  import {computed} from 'vue'
 
  const route = useRoute();
  const path = computed(() =>route.path)

</script> -->

<script>
  import 'font-awesome/css/font-awesome.min.css'
  import DarkThemeButton from "./components/public/DarkThemeButton.vue";
  import {useRoute} from 'vue-router'
  import {computed} from 'vue'

  export default{
    components: {
      DarkThemeButton
    },
    data: () => {
      return {
        path: computed(() =>useRoute().path)
      }
    },
    created(){
      document.title = "Malo Le Mestre"
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
   background-image: url("assets/white-theme-bckground.jpg");
   background-repeat: no-repeat;
   background-attachment: fixed;
   
}

.main-content{
    margin-top: 25px;
    margin-bottom: 100%;
    margin-left: 70px;
    margin-right: 70px;
    transition: 0.3s;
  }

.light {
  background-color: white;
  background-image: url("assets/white-theme-bckground.jpg");
  color:rgb(0, 0, 0);
  transition: 0.3s;
}

.dark #app {
    background-color: rgb(57, 57, 57);
    color:rgb(244, 244, 244);
    background-image: url("assets/dark-theme-bckground.jpg");
    transition: 0.3s;
}

nav {
  padding: 20px;
  background-color: black;
  border-color: #070707;
  border: 2px solid;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-bottom-color: rgb(55, 51, 51);
  border-left-width: 0px;
}

nav a {
  font-weight: bold;
  color: #e3e1e1;
}

nav a.router-link-exact-active {
  color: #b3b3b3;
}

.link {
    padding-right: 27px;
}
</style>
