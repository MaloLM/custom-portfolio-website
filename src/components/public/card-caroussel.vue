<template>
    <Carousel class="caroussel-margin" :settings="settings" :breakpoints="breakpoints">
    <Slide v-for="slide in 10" :key="slide">
        <w-card :image="`${settings.baseUrl}images/japanese-wave.png`" class="caroussel-card">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.

          <template #actions>
            <div class="spacer"></div>
            <w-button>Read more</w-button>
          </template>
        </w-card>
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
      name: 'Break-points',
      components: {
        Carousel,
        Slide,
        Navigation,
      },
      data: () => ({
        // carousel settings
        settings: {
          baseUrl: 'https://antoniandre.github.io/wave-ui/',
          itemsToShow: 1,
          snapAlign: 'center',
        },
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        breakpoints: {
          // 700px and up
          700: {
            itemsToShow: 3.5,
            snapAlign: 'center',
          },
          // 1024 and up
          1024: {
            itemsToShow: 4,
            snapAlign: 'start',
          },
        },
      }),
    });
    </script>
    

<style scoped>

.caroussel-margin{
  margin-top: 20px;
  margin-bottom: 50px;
}

.caroussel-card{
  margin-right: 40px;
    background-color: rgba(255, 255, 255, 1);
}

.dark .caroussel-card {
  background-color: black;
}
</style>