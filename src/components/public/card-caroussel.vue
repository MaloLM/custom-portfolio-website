<template>
    <h1 class="caroussel-title" v-if="posts != null"> {{title}} </h1>
    <Carousel class="caroussel" :settings="settings" :breakpoints="breakpoints" v-if="posts">
      <Slide  v-for="(post) in posts" :key="post.createdAt">
        <div class="card-container">
          <w-card
          :image="post.image" 
          onerror='this.onerror=null; 
          this.image="https://cdn.discordapp.com/attachments/601416273892605983/1028011494891335801/failed_to_load.png"'
          class="caroussel-card box sh6" 
          no-border
          shadow>
            <w-divider class="card-divider mx-3"></w-divider>
            <h2 style="float:left">{{post.title}}</h2>
            <template #actions>
              <div class="spacer"></div>
              <w-button 
              :id="post.id" 
              class="px4" 
              @click="loadDialog" 
              round lg>
              Read more
              </w-button>
            </template>
          </w-card>
        </div>
      </Slide>

      <template #addons>
          <Navigation />
      </template>
    </Carousel>

    <w-dialog  
      id="dialog"
      v-model="dialog.show"
      :fullscreen="dialog.fullscreen"
      width="45vw"
      :bg-color="dialog.dialogBgColor"
      :persistent="dialog.persistent"
      :persistent-no-animation="dialog.persistentNoAnimation"
      title-class="primary-light1--bg white">

      <div class="container">
        <div class="title">
          <h1 style="float:left">{{dialog.title}}</h1>
        </div>
        <div class="date" v-if="dialog.date != null && dialog.date != '-'">
          <p style="float:left ">{{dialog.date}}</p>
        </div>
        <div class="void-a"></div>
        <div class="description">
          <p class="dialog-description"> {{dialog.description}}</p>
        </div>

        <div ref="skills" class="skills" v-if="dialog.skills != null && dialog.skills != '-'">
          <p style="font-weight: bold;">Skills</p>
          <TagsGroup :unparsedData="dialog.skills " bgColor="success" textColor="white"></TagsGroup>
        </div>

        <div ref="ressources" class="ressources" v-if="dialog.ressources != null && dialog.ressources != '-'">
          <p style="font-weight: bold; margin-top: 7px;">Ressources & technologies</p>
          <TagsGroup :unparsedData="dialog.ressources" bgColor="deep-purple" textColor="white"></TagsGroup>
        </div>

        <div class="ressource">
          <a  v-if="dialog.ressource != null && dialog.ressource.name != '-' && dialog.ressource.link != '-'"
          @click="redirectToRessource" 
          target="_blank"> 
          {{dialog.ressource.name}} 
          </a>
          <w-button 
          @click="unloadDialog"  
          class="ma1 text-bold close-buttom" 
          bg-color="transparent"
          color="red" 
          outline xl
          style="float:right">
          Close
          </w-button>
        </div>
      </div>
    </w-dialog>
</template>


<script>
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import TagsGroup from './TagsGroup.vue';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Breakpoints',
  props:{
    title: String,
    posts : Object
  },
  data: () => ({
    store: useStore(),
    dialog: {
      dialogBgColor: null,
      show: false,
      fullscreen: false,
      persistent: false,
      persistentNoAnimation: false,
      width: 'auto',
      title: null,
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
    },
    breakpoints: {
      // 800px and up
      800: {
        itemsToShow: 2,
        snapAlign: 'center',
      },
    
      1024: { // 1024 and up
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
    loadDialog(event){
      let id = event['srcElement']['id'];
      let object = null
      console.log(this.$refs)


      Object.entries(this.posts).forEach(([key, value]) => {
          if(value['id'] == id){
            console.log(key)
            object = value
          }
      });

      if(object != null){
        const isDark = this.store.getters.theme.isDark

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
    },
    unloadDialog(){
      this.dialog.show = false
    },
    redirectToRessource(){
      window.open(this.dialog.ressource.link);
    },
    checkScreen(){
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
    }
  },
  created(){
    this.checkScreen()
    window.addEventListener('resize', this.checkScreen)
  },
});
</script>
    

<style>
.hide {
  display: none;
}

.caroussel-title{
  margin-left: 50px;
} 

.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}

.carousel__next{
  float: right;
  margin-right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: rgb(44, 70, 125);
  border: solid;
  border-color: rgba(255, 255, 255, 0.921);
  color: rgba(255, 255, 255, 0.921);
  transition: 0.5s;
}

.carousel__prev{
  float: left;
  margin-left: 40px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: rgb(44, 70, 125);
  border: solid;
  border-color: rgba(255, 255, 255, 0.921);
  color: rgba(255, 255, 255, 0.921);
  transition: 0.5s;
}

.carousel__next:hover {
  background-color: rgba(255, 255, 255, 0.9);
  border-color:rgb(44, 70, 125);
  color: rgb(44, 70, 125);
  transition: 0.5s;
}

.carousel__prev:hover {
  background-color: rgba(255, 255, 255, 0.9);
  border-color: rgb(44, 70, 125);
  color: rgb(44, 70, 125);
  transition: 0.5s;
}

.container {
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 0.2fr 0.2fr 2fr 0.5fr 0.5fr 0.3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "title title title"
    "date date void-a"
    "description description description"
    "ressources ressources ressources"
    "skills skills skills"
    "ressource ressource ressource"; 
}

.title {
  grid-area: title;
}

.date { 
  font-weight: bold;
  grid-area: date;
  margin-left: 10px; 
}

.void-a {
  grid-area: void-a;
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
}

.skills { 
  grid-area: skills;
  margin-left: 10px; 
  margin-top: 15px;
 }

.ressource { 
  text-decoration: underline; 
  grid-area: ressource;
  margin: 10px; 
 }

.ressource:hover a {
  cursor: pointer;
}

.caroussel{
  margin-top: 10px;
  margin-bottom: 30px;
}

.caroussel-card{
  margin: 30px;
  background-color: rgba(255, 255, 255, 1);
}

.dark .caroussel-card {
  background-color: rgb(50, 50, 50);
}

.card-container{
  width: 100%;
  height: 100%;
}

button {
  background-color: #2d467d;
  border: 0;
  padding: 10px 25px;
  margin-top: 20px;
  margin-left: 10px;
  color: white;
  border-radius: 6px;
  font-size:13px;
}

.card-divider{
  margin-top: -12px;
  margin-bottom: 10px;
}

.dialog-description{
  width: 100%;
  height: auto;
}

/* most litle dimensions at the bottom*/
@media screen and (max-width: 667px) {
    .carousel__next {
      display: none;
    }

    .carousel__prev {
      display: none;
    }

    .caroussel-title{
      margin-left: 0;
      text-align: center;
    }
}
</style>