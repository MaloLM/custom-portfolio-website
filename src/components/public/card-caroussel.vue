<template>
    <Carousel class="caroussel-margin" :settings="settings" :breakpoints="breakpoints">
    <Slide v-for="slide in 10" :key="slide">
        <w-card class="caroussel-card" title="Card title" title-class="blue-light5--bg">
        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem dolore delectus,
            quisquam ipsa laudantium esse consequatur itaque similique et eligendi eum voluptas
            odit dolor labore eveniet at vel sequi nostrum.<br><br>
        </p>
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
            itemsToShow: 5,
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
</style>