<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <!-- Conditional rendering of the title if 'posts' is not null -->
  <h1 class="caroussel-title" v-if="posts != null">{{ title }}</h1>

  <!-- Carousel component with settings and breakpoints, rendered only when 'posts' exist -->
  <Carousel class="caroussel" :settings="settings" :breakpoints="breakpoints" v-if="posts">
    <!-- Loop through 'posts' and create a Slide for each post -->
    <Slide v-for="(post) in posts" :key="post.createdAt">
      <div class="card-container">
        <!-- W-Card component displaying post information and image -->
        <w-card
          @click="loadDialog(post.id)"
          :image="post.image"
          class="caroussel-card box sh6"
          :image-props="imageProps"
          no-border
          shadow
        >
          <w-divider class="card-divider mx-3"></w-divider>
          <div class="card-top-info">
            <!-- Post title -->
            <h2>{{ post.title }}</h2>
            <!-- Post date if it exists, or a hidden dash otherwise -->
            <h3 class="card-date" v-if="post.date != null && post.date != '-'">{{ post.date }}</h3>
            <p v-else class="card-date" style="visibility: hidden">-</p>
          </div>
          <!-- Actions template -->
          <template #actions>
            <div class="spacer"></div>
            <!-- 'Read more' button if 'showMore' is not 'false' -->
            <button v-if="showMore != 'false'">Read more</button>
          </template>
        </w-card>
      </div>
    </Slide>

    <!-- Addons template, including Navigation component -->
    <template #addons>
      <Navigation />
    </template>
  </Carousel>

  <!-- W-Dialog component for displaying post details -->
  <w-dialog
    @close="unloadDialog"
    id="dialog"
    v-model="dialog.show"
    :fullscreen="dialog.fullscreen"
    width="45vw"
    :bg-color="dialog.dialogBgColor"
    :persistent="dialog.persistent"
    :persistent-no-animation="dialog.persistentNoAnimation"
    title-class="primary-light1--bg white"
    overlay-opacity="0.6"
  >
    <div class="container">
      <div class="title">
        <!-- Dialog title -->
        <h1 style="float:left">{{ dialog.title }}</h1>
      </div>
      <div class="date" v-if="dialog.date != null && dialog.date != '-'">
        <!-- Dialog date if it exists, or a hidden dash otherwise -->
        <p style="float:left">{{ dialog.date }}</p>
      </div>
      <div class="void-a"></div>
      <div class="description">
        <!-- Dialog description -->
        <p class="dialog-description">{{ dialog.description }}</p>
      </div>

      <!-- Ressources and technologies section if it exists -->
      <div ref="ressources" class="ressources" v-if="dialog.ressources != null && dialog.ressources != '-'">
        <p style="font-weight: bold; margin-top: 7px;">Ressources & technologies</p>
        <!-- TagsGroup component for displaying resources and technologies -->
        <TagsGroup :unparsedData="dialog.ressources" bgColor="purple"></TagsGroup>
      </div>

      <!-- Skills section if it exists -->
      <div ref="skills" class="skills" v-if="dialog.skills != null && dialog.skills != '-'">
        <p style="font-weight: bold;">Skills</p>
        <!-- TagsGroup component for displaying skills -->
        <TagsGroup :unparsedData="dialog.skills" bgColor="green"></TagsGroup>
      </div>

      <div class="ressource">
        <!-- Link to a resource if it exists -->
        <a
          v-if="dialog.ressource != null && dialog.ressource.name != '-' && dialog.ressource.link != '-'"
          @click="redirectToRessource"
          target="_blank"
        >
          {{ dialog.ressource.name }}
        </a>
        <!-- Close button, visible only if 'mobile' is not true -->
        <button v-if="mobile != true" @click="unloadDialog" style="float:right">Close</button>
      </div>

      <!-- Close button for mobile devices -->
      <button class="mobile-close-dialog-button" v-if="mobile == true" @click="unloadDialog">Close</button>
    </div>
  </w-dialog>
</template>


<script>
  import { defineComponent } from 'vue';
  import { Carousel, Navigation, Slide } from 'vue3-carousel';
  import TagsGroup from './TagsGroup.vue';
  import { useStore } from 'vuex'
  import 'vue3-carousel/dist/carousel.css';

  export default defineComponent({
    name: 'Breakpoints',
    props:{
      title: String,
      posts : Object,
      showMore: String, 
    },
    data: () => ({
      store: useStore(),
      mobile: null,
      imageProps: { 
        fallback: "https://firebasestorage.googleapis.com/v0/b/my-portefolio-application.appspot.com/o/images%2Ffailed_to_load.png?alt=media&token=92c67b38-9260-46eb-95f2-17e3ed69bce4"
      },
      dialog: {
        dialogBgColor: null,
        show: false,
        fullscreen: false,
        persistent: false,
        persistentNoAnimation: false,
        width: 'auto',
        title: null,
        date: null,
        image: null,
        description: null,
        ressources: null,
        skills: null,
        ressource: {
          name: null,
          link: null,
        }
      },
      settings: {
        itemsToShow: 1.15,
        snapAlign: 'center',
        mouseDrag: true,
        touchDrag: true, 
      },
      breakpoints: { 
        800: { // Breakpoint at 800px and up
          itemsToShow: 2.15,
          snapAlign: 'center',
        },
      
        1024: { // Breakpoint at 1024px and up
          itemsToShow: 3.15,
          snapAlign: 'center',
        },
      },
    }),
    components: {
      Carousel,
      Slide,
      Navigation,
      TagsGroup
    },
    methods: {
      loadDialog(postId){ 
        // Method to load a dialog when 'showMore' is 'true'
        if(this.showMore == 'true') {
          let body = document.body
          body.classList.add('no-scroll')
          if (this.isBrowserSafari()){
            body.classList.add('safari-no-scroll')
          }

          let object = null

          // Iterate through 'posts' to find the post with a matching 'id'
          Object.entries(this.posts).forEach(([, value]) => {
            if(value['id'] == postId){
              object = value
            }
          });

          if(object != null){
            const isDark = this.store.getters.theme.isDark

            // Set dialog background color based on theme
            if(isDark == true){
              this.dialog.dialogBgColor = 'grey-dark5'
            } else {
              this.dialog.dialogBgColor = 'white'
            } 
            this.dialog.title = object.title;
            this.dialog.date = object.date;
            this.dialog.image = object.image;
            this.dialog.description = object.description;
            this.dialog.ressources = object.ressources;
            this.dialog.skills = object.skills;
            this.dialog.title = object.title;
            this.dialog.ressource.name = object.ressource.name;
            this.dialog.ressource.link = object.ressource.link;
            
            this.dialog.show = true
          }
        }
      },
      unloadDialog(){
        // Method to close the dialog and remove scroll locks
        let body = document.body
        body.classList.remove('no-scroll')
        if (this.isBrowserSafari()){
          body.classList.remove('safari-no-scroll')
        }
        this.dialog.show = false
      },
      redirectToRessource(){
        // Method to open the resource link in a new window/tab
        window.open(this.dialog.ressource.link);
      },
      checkScreen(){
        // Method to check the screen width and set 'mobile' and 'fullscreen' accordingly
        this.windowWidth = window.innerWidth;
        if(this.windowWidth < 750){
          this.mobile = true;
          this.dialog.fullscreen = true;
          return;
        } 
        this.mobile = false;
        this.openDrawer = false;
        this.dialog.fullscreen = false;
        return;
      },
      isBrowserSafari() {
        // Method to check if the browser is Safari
        var ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('safari') != -1) { 
          if (ua.indexOf('chrome') > -1) {
            return false // Chrome
          } else {
            return true // Safari
          }
        }
      }
    },
    created(){
      // Call 'checkScreen' method on component creation and on window resize
      this.checkScreen()
      window.addEventListener('resize', this.checkScreen)
    },
  });
</script>

    

<style>
  /* Styling for the card top info section */
  .card-top-info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  /* Styling for card date */
  .card-date {
    margin-left: 9px;
    color: rgb(100, 114, 130);
  }

  /* Dark mode styles for card date */
  .dark .card-date {
    color: rgb(205, 219, 233);
  }

  /* Class to hide scroll overflow */
  .no-scroll {
    overflow: hidden;
  }

  /* Safari-specific class to disable scrolling */
  .safari-no-scroll {
    touch-action: none;
    -ms-touch-action: none;
  }

  /* Styling for caroussel title */
  .caroussel-title {
    margin-left: 50px;
    font-size: 46px;
  }

  /* Styling for carousel navigation buttons */
  .carousel__prev--in-active,
  .carousel__next--in-active {
    display: none;
  }

  .carousel__next {
    float: right;
    margin-right: 40px;
    width: 70px;
    height: 70px;
    border-radius: 70px;
    background-color: rgb(196, 196, 196);
    border: solid;
    border-color: rgba(255, 255, 255, 1);
    color: rgba(255, 255, 255, 0.921);
    transition: 0.5s;
  }

  .carousel__prev {
    float: left;
    margin-left: 40px;
    width: 70px;
    height: 70px;
    border-radius: 70px;
    background-color: rgb(196, 196, 196);
    border: solid;
    border-color: rgba(255, 255, 255, 1);
    color: rgba(255, 255, 255, 0.921);
    transition: 0.5s;
  }

  /* Icon size for carousel navigation */
  .carousel__icon {
    width: 2em;
    height: 2em;
  }

  /* Dark mode styles for carousel navigation */
  .dark .carousel__prev,
  .dark .carousel__next {
    border-style: solid;
    border-color: rgba(166, 166, 166, 0.5);
  }

  /* Hover effect for carousel navigation buttons */
  .carousel__next:hover {
    background-color: rgba(160, 160, 160, 1);
    transition: 0.5s;
  }

  .carousel__prev:hover {
    background-color: rgba(160, 160, 160, 1);
    transition: 0.5s;
  }

  /* Hover effect for general buttons */
  button:hover {
    cursor: pointer;
    background-color: #3c5ca2;
  }

  /* Styling for mobile close dialog button */
  .mobile-close-dialog-button {
    margin: auto;
    width: 70%;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  /* Container styles for layout */
  .container {
    display: flex;
    flex-direction: column;
  }

  /* Styling for various card elements */
  .title {
    grid-area: title;
  }

  .date {
    font-weight: bold;
    font-size: 22px;
    grid-area: date;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .description {
    grid-area: description;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: justify;
    text-justify: inter-word;
  }

  .ressources {
    grid-area: ressources;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .skills {
    grid-area: skills;
    margin-left: 10px;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  /* Styling for underlined resourced links */
  .ressource {
    text-decoration: underline;
    grid-area: ressource;
    margin: 10px;
  }

  .ressource:hover a {
    cursor: pointer;
  }

  /* Styling for carousel */
  .caroussel {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  /* Styling for carousel cards */
  .caroussel-card {
    margin: 30px;
    background-color: rgba(255, 255, 255, 1);
    transition: 0.2s;
  }

  /* Hover effect for carousel cards */
  .caroussel-card:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: 0.3s;
  }

  /* Dark mode styles for carousel cards */
  .dark .caroussel-card {
    background-color: rgb(50, 50, 50);
  }

  /* Styling for card container */
  .card-container {
    width: 100%;
    height: 100%;
  }

  /* Styling for buttons */
  button {
    padding: 10px 26px;
    margin-left: 10px;
    border-radius: 22px;
    font-size: 17px;
  }

  /* Styling for card divider */
  .card-divider {
    margin-top: -12px;
    margin-bottom: 10px;
  }

  /* Styling for dialog description */
  .dialog-description {
    width: 100%;
    height: auto;
    font-size: 21px;
  }

  /* Media query for smaller screens (max-width: 667px) */
  @media screen and (max-width: 667px) {
    /* Hide carousel navigation buttons */
    .carousel__next {
      display: none;
    }

    .carousel__prev {
      display: none;
    }

    /* Adjust caroussel title for smaller screens */
    .caroussel-title {
      margin-left: 0;
      text-align: center;
      font-size: 28px;
    }

    /* Styling for buttons on smaller screens */
    button {
      padding: 12px 20px;
      margin-left: 10px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: bold;
    }

    /* Styling for h1 on smaller screens */
    h1 {
      font-size: 26px;
    }
  }
</style>
