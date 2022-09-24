<template>
    <nav>
      <router-link to="/" class="link">About me </router-link> 
      <router-link to="/career" class="link">Career </router-link> 
      <router-link to="/travels" class="link">Travels </router-link>
      <router-link to="/get-in-touch" class="link">Get in touch </router-link> 
      <!-- <router-link to="/authentication" class="link">tempAuth </router-link>  -->
      
      <div style="float:right">
        <DarkThemeButton style="float:left" />

        <!-- <router-link to="/authentication" class="link"> 
          <w-icon class="paramButton"  style="float:right; margin-left: 8px;"
          xl
          color="grey-light4">
          fa fa-cog
         </w-icon>
        </router-link> -->

        <w-icon class="paramButton" 
          xl
          style="float:right; margin-left: 8px;" 
          color="grey-light4">
          fa fa-cog
         </w-icon>
        
      </div>
       
    </nav>
    <router-view/>
</template>


<script setup>
import 'font-awesome/css/font-awesome.min.css'
import { useStore } from 'vuex'
import DarkThemeButton from "./public/DarkThemeButton.vue";

const store = useStore()

function updateOverlayState(){
  var showOverlay = store.getters
  showOverlay = showOverlay.user.showOverlay

  if(showOverlay){
    store.commit('SET_SHOW_OVERLAY', false)
  } else {
    store.commit('SET_SHOW_OVERLAY', true)
  }  
}
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
  