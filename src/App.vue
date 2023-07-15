<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the MIT License
https://opensource.org/licenses/MIT
-->

<template>

<w-app>
  <nav id="navbar">
      <w-icon  v-show="mobile"
      @click="openDrawer = 'left'"
        class="burgerMenu" 
        xl
        style="float:left;
        margin-left: 8px;"
        color="grey-light4">
        fa fa-bars
      </w-icon> 
      
      <router-link to="/" class="link" v-show="!mobile">About me </router-link> 
      <router-link to="/career" class="link" v-show="!mobile">Career </router-link> 
      <!-- <router-link to="/travels" class="link" v-show="!mobile">Travels </router-link> -->
      <router-link to="/contact" class="link" v-show="!mobile">Get in touch </router-link> 
      <a class="link linkButton" :onclick="downloadCV" v-show="!mobile">Get my CV </a>

      <div style="float:right" >
        <DarkThemeButton style="float:left" />
        <router-link to="/authentication" class="link" v-show="!mobile">
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

    <w-drawer
      v-model="openDrawer"
      :[position]="true"
      bg-color="grey-dark5">
      <nav class="navMenu">
        <w-icon  v-show="mobile"
        @click="toggleMobileNav"
        class="burgerMenu" 
        xl
        style="float:left;
        margin-left: 8px;"
        color="grey-light4">
        fa fa-bars
        </w-icon> 
        <router-link to="/" class="link" @click="toggleMobileNav">About me </router-link> 
        <router-link to="/career" class="link" @click="toggleMobileNav">Career </router-link> 
        <!-- <router-link to="/travels" class="link" @click="toggleMobileNav">Travels </router-link> -->
        <router-link to="/contact" class="link" @click="toggleMobileNav">Get in touch </router-link> 
        <a class="link linkButton" :onclick="downloadCV">Get my CV </a>
        <router-link to="/authentication" v-show="!mobile" class="link" @click="toggleMobileNav">Sign-in </router-link>
      </nav>
    </w-drawer>
</w-app>
</template>

<script>
  import 'font-awesome/css/font-awesome.min.css'
  import DarkThemeButton from "./components/public/DarkThemeButton.vue";
  import {useRoute} from 'vue-router'
  import {computed} from 'vue'
  import axios from 'axios';
  import databaseService from './services/databaseService';

  export default{
    components: {
      DarkThemeButton
    },
    data: () => {
      return {
        path: computed(() => useRoute().path),
        mobile: null,
        windowWidth: null,
        openDrawer: false,
        pageTitle: "Malo Le Mestre",
      }
    },
    computed: {
      position () {
        return this.openDrawer || 'left'
        }
    },
    created(){
      this.checkScreen()
      document.title = this.pageTitle
      window.addEventListener('resize', this.checkScreen) 
    },
    methods:{
      toggleMobileNav(){
        this.openDrawer = ! this.openDrawer;
      },
      checkScreen(){
        this.windowWidth = window.innerWidth;
        if(this.windowWidth < 750){
          this.mobile = true;
          return;
        } 
        this.mobile = false;
        this.openDrawer = false;
        return;
      },
      downloadCV() {
        databaseService.getCurriculumVitaeLink().on('value', (snapshot) => {
          let cvLink = snapshot.val()
          cvLink = process.env.VUE_APP_CV_LINK
          console.log('cvLink', cvLink)

          axios({
            url: cvLink,
            method: 'GET',
            responseType: 'blob',
          }).then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fURL = document.createElement('a');

            fURL.href = fileURL;
            fURL.setAttribute('download', 'malo_le_mestre_CV.pdf');
            document.body.appendChild(fURL);

            fURL.click();
          });
        });
        
      }
    }
  }
</script>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  transition: 0.3s;
  background-color: #ffffff;
  background-image: url("assets/white-theme-bckground.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
}

.main-content{
  margin: 25px 70px;
  transition: 0.3s;
}

.light #app {
  background-color: white;
  background-image: url("assets/white-theme-bckground.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  color:#2c3e50;
  transition: 0.3s;
}

.dark #app {
  background-color: rgb(57, 57, 57);
  color:rgb(206, 205, 205);
  background-image: url("assets/dark-theme-bckground.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  transition: 0.3s;
}

.dark .w-card {
  border-style: solid;
  border-color: rgba(166, 166, 166, 0.5);
}

nav {
  padding: 20px;
  background-color: rgb(47, 47, 47);
  border-color: #070707;
  border: 2px solid;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-bottom-color: rgb(36, 35, 35);
  border-left-width: 0px;
  width: 100vw;
}

.pageTitle{
  font-size: 60px;
}

.description{
  font-size: 18px;
}

nav a {
  font-weight: bold;
  color: #e3e1e1;
}

nav a.router-link-exact-active {
  color: #b3b3b3;
}

.linkButton {
  cursor: pointer;
}

.link {
  padding-right: 27px;
}

.navMenu{
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
}

.navMenu .link{
  margin-top: 20px;
  font-size: 30px;
}

button {
    background-color: #2d467d;
    border: 0;
    padding: 10px 40px;
    margin-top: 0px;
    color: white;
    border-radius: 20px;
    font-size:13px;
}

@media (max-width: 667px) {
  #app {
    background-image: none;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .light #app {
    background-image: none;
    background-color: rgba(234, 234, 234, 0.9);
    background-repeat: no-repeat;
    background-attachment: fixed;
    color:#2c3e50;
    transition: 0.3s;
  }

  .dark #app {
    background-color: rgba(50, 50, 50, 0.9);
    color:rgb(206, 205, 205);
    background-image: none;
    background-repeat: no-repeat;
    background-attachment: fixed;
    transition: 0.3s;
  }
}
</style>
