<template>
    <h1 v-if="posts != null"> {{title}} </h1>
    <Carousel class="caroussel-margin" :settings="settings" :breakpoints="breakpoints" v-if="posts">
    <Slide  v-for="(post) in posts" :key="post.createdAt">
      <div class="card-container">
        <w-card :image="post.image" class="caroussel-card">
          <h4 style="float:left">{{post.title}}</h4>
          <template #actions>
            <div class="spacer"></div>
            <!-- <w-button>Read more</w-button> -->

            <button>Read more</button>
          </template>
        </w-card>
      </div>
        
    </Slide>

    <template #addons>
        <Navigation />
    </template>
    </Carousel>
</template>


<script>
    import { defineComponent } from 'vue';
    import { Carousel, Navigation, Slide } from 'vue3-carousel';
    
    import 'vue3-carousel/dist/carousel.css';

    
    export default defineComponent({
      name: 'Breakpoints',
      props:{
        title: String,
        posts : Object
      },
      components: {
        Carousel,
        Slide,
        Navigation,
      },
      methods: {},
      data: () => ({
        settings: {
          itemsToShow: 1,
          snapAlign: 'center',
        },
        breakpoints: {
          // 700px and up
          700: {
            itemsToShow: 3,
            snapAlign: 'center',
          },
          // 1024 and up
          1024: {
            itemsToShow: 3.15,
            snapAlign: 'center',
          },
        },
      }),
      mounted(){},
    });
    </script>
    

<style>

.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}

.caroussel-margin{
  margin-top: 20px;
  margin-bottom: 50px;
}

.caroussel-card{
  margin-right: 40px;
    background-color: rgba(255, 255, 255, 1);
}

.dark .caroussel-card {
  background-color: rgb(30, 30, 30);
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
    /* margin-left: 10px; */
    color: white;
    border-radius: 6px;
    font-size:13px;
}
</style>