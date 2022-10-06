<template>
    <h1 v-if="posts != null"> {{title}} </h1>
    <Carousel class="caroussel-margin" :settings="settings" :breakpoints="breakpoints" v-if="posts">
    <Slide  v-for="(post) in posts" :key="post.createdAt">
      <div class="card-container">
        <w-card  :image="post.image" class="caroussel-card" no-border>
          <w-divider class="test mx-3"></w-divider>
          <h4 style="float:left">{{post.title}}</h4>
          <template #actions>
            <div class="spacer"></div>
            <w-button :id="post.id" class="px4" @click="loadDialog">Read more</w-button>
          </template>
        </w-card>
      </div>
        
    </Slide>

    <template #addons>
        <Navigation />
    </template>
    </Carousel>

    <w-dialog 
      v-model="dialog.show"
      :fullscreen="dialog.fullscreen"
      width="45vw"
      :persistent="dialog.persistent"
      :persistent-no-animation="dialog.persistentNoAnimation"
      title-class="primary-light1--bg white">

      <img class="dialog-image" :src="dialog.image"/>

      <w-divider class="my6 mx-3 divider"></w-divider>

      <div class="container">
        <div class="title">
          <h1 style="float:left">{{dialog.title}}</h1>
        </div>
        <div class="date">
          <p style="float:left ">{{dialog.date}}</p>
        </div>
        <div class="void-a"></div>
        <div class="description">
          <p class="dialog-description"> {{dialog.description}}</p>
        </div>
        <div class="ressources">
          <TagsGroup :unparsedData="dialog.ressources" bgColor="success" textColor="white"></TagsGroup>
        </div>
        <div class="skills">
          <TagsGroup :unparsedData="dialog.skills" bgColor="deep-purple" textColor="white"></TagsGroup>
          
        </div>
        <div class="ressource">
          <button @click="redirectToRessource" target="_blank"> {{dialog.ressource.name}} </button>
        </div>
    </div>

      <template #actions>
        <div class="spacer"/>
        <button @click="unloadDialog">Close</button>
      </template>
    </w-dialog>
</template>


<script>
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import TagsGroup from './TagsGroup.vue';

export default defineComponent({
  name: 'Breakpoints',
  props:{
    title: String,
    posts : Object
  },
  data: () => ({
    dialog: {
      show: false,
      fullscreen: false,
      persistent: true,
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
      itemsToShow: 1,
      snapAlign: 'center',
    },
    breakpoints: {
      // 700px and up
      800: {
        itemsToShow: 2,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
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
      Object.entries(this.posts).forEach(([key, value]) => {
          if(value['id'] == id){
            console.log(key)
            object = value
          }
      });

      if(object != null){
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

      this.dialog.title = null;
      this.dialog.image = null;
      this.dialog.description = null;
      this.dialog.ressources = null;
      this.dialog.skills = null;
      this.dialog.title = null;
      this.dialog.ressource.name = null;
      this.dialog.ressource.link = null;
      console.log('unloaded')
    },
    redirectToRessource(){
      window.open(this.dialog.ressource.link);
    }
  },
  mounted(){},
});
</script>
    

<style>

.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}

.container {
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 0.5fr 0.2fr 2fr 0.5fr 0.5fr 0.4fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "title title title"
    "date date void-a"
    "description description description"
    "ressources ressources ressources"
    "skills skills skills"
    "ressource ressource ressource"; 
}
.title { grid-area: title; }
.date { 
  grid-area: date;
  margin-left: 15px; 
}
.void-a { grid-area: void-a; }
.description { 
  grid-area: description;
  margin: 15px; 
  text-align: justify;
  text-justify: inter-word;
}
.ressources { grid-area: ressources; }
.skills { grid-area: skills; }
.ressource { grid-area: ressource; }

.caroussel-margin{
  margin-top: 20px;
  margin-bottom: 50px;
}

.caroussel-card{
  margin: 0px 20px;
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

.test{
  margin-top: -12px;
  margin-bottom: 10px;
}

.dialog-description{
  width: 100%;
  height: auto;
}

.dialog-image{
  width: 100%;
  height: auto;
}

.divider{
  margin-bottom: 1px;
}
</style>