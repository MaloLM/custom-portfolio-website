<template>
  <div class="getInTouch">
      <w-card class="main-content">
        <h1 class="title">{{title}}</h1>
        <ContactForm></ContactForm>
      </w-card>
  </div>
</template>


<script>
import ContactForm from '@/components/public/ContactForm.vue';

export default {
  name: "contact-view",
  components: {
    ContactForm
    },
  data() {
    return {
      title: "Get in touch",
    };
  },
};
</script>


<style scoped>
.main-content{
  margin-top: 100px;
  margin-left: 100px;
  margin-right: 100px;
  background-color: rgba(255, 255, 255, 1);
}

.getInTouch{
  height: 100vh;
}

.dark .w-card {
  background-color: black;
 }

 .title {
  margin-left: 10px;
  font-size: 40px;
 }

 @media (max-width: 667px) {
  .title {
    text-align: center;
    margin: 0;
    font-size: 40px;
  }
  .main-content{
    margin-top: 15px;
    margin-left: 12px;
    margin-right: 12px;
    transition: 0.3s;
  }
}

</style>
