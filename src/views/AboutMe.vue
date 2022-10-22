<template>
<div class="aboutMe" >
  <div class="main-content" v-if="dialog.show != null && dialog.show != true">
    <img class="mobile-image" v-if="image != null && image != ''"
    v-bind:src="image"/>
    <div>
      
      <div class="container">
        <h1 class="pageTitle"> {{firstName}} <br class="linebreak"/> {{lastName}} </h1>
        <p class="description">{{description}}</p>
        <div class="void">
        <w-image
        :src="`${image}`"
        class="desktop-image"
        width="280px"
        height="260px">
        </w-image>
        </div>
      </div>   
    </div>
    <br/>
  </div>

  <CardCaroussel title="Hobbies and interests" v-if="hobbiesAndInterestsPosts != null"  :posts="hobbiesAndInterestsPosts"></CardCaroussel>
  <CardCaroussel title="Personnal projects" v-if="personnalProjectsPosts != null" :posts="personnalProjectsPosts"></CardCaroussel>
  
  <w-dialog  
  :model-value="dialog.show == true"
  :fullscreen= "loadingFullscreen">

  <div class="loading-dialog-content">
    <w-progress 
    class="ma1 dialog-progress" 
    circle :model-value="undefined">
  </w-progress>
    <h2 class="dialog-text">Loading experience</h2>
  </div>
  </w-dialog>
</div>  
</template>

<script>
import CardCaroussel from '@/components/public/Card-caroussel.vue';
import databaseService from '@/services/databaseService';
import { useStore } from 'vuex';
  
export default {
  name: "about-me-view",
  components: { CardCaroussel, },
  data() {
    return {
      store: useStore(),
      firstName: null,
      lastName: null,
      description: null,
      image: null,
      personnalProjectsPosts: null,
      hobbiesAndInterestsPosts: null,
      loadingFullscreen: true,
      windowWidth: null,
      dialog: {
        show: null,
      }
    };
  },
  methods: {
    sortByCreationDate(posts){
      let array = []

      Object.entries(posts).forEach(([key, value]) => {
          value['id'] = key
          array.push(value)
      })

      array = array.sort((a, b) => {
          return b.createdAt - a.createdAt;
      });
      return array
    },
  },
  created() {
    this.dialog.show = this.store.getters.showDialog;
  },
  mounted() {
    databaseService.getAboutMeOrCareerData('about-me','firstName').on('value', (snapshot) => {
      this.firstName = snapshot.val()
      databaseService.getAboutMeOrCareerData('about-me','lastName').on('value', (snapshot) => {
        this.lastName = snapshot.val()
        databaseService.getAboutMeOrCareerData('about-me', 'description').on('value', (snapshot) => {
          this.description = snapshot.val()
          databaseService.getAboutMeOrCareerData('about-me', 'image').on('value', (snapshot) => {
            this.image = snapshot.val()

            databaseService.getPersonnalProjects().on('value', (snapshot) => {
              
              let posts = this.sortByCreationDate(snapshot.val())
              this.personnalProjectsPosts = posts

              databaseService.getHobbiesAndInterests().on('value', (snapshot) => {

                let posts = this.sortByCreationDate(snapshot.val())
                this.hobbiesAndInterestsPosts = posts

                this.store.commit('SET_SHOW_DIALOG', false)
                this.dialog.show = false

              }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });
            }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });
          }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });
        }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 
      }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 
    }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 
  },
};
</script>


<style scoped>
.loading-dialog-content {
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.dialog-text {
  font-size: 30px;
}
  
.container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1.2fr 0.8fr; 
  grid-template-rows: 0.3fr 0.3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "pageTitle void"
    "description void"; 
}

.pageTitle { grid-area: pageTitle; }

.description { 
  grid-area: description;
  font-weight: 500;
  color: rgb(77, 77, 77);
  float: left;
  font-size: 25px;
  text-align: left;
  margin: 0;
  margin-left: 15px;
 }

 .dark .description {
  color:rgb(206, 205, 205);
 }

.void { 
  grid-area: void;
  margin: auto; 
}

.mobile-image {
  display: none;
  pointer-events: none;
}

.desktop-image {
  pointer-events: none;
}

.linebreak {
  display: none;
}

@media (max-width: 667px) {

  .linebreak {
    display: block;
  }

  .container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1.2fr 0fr; 
  grid-template-rows: 0.3fr 0.3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "pageTitle void"
    "description void"; 
  }

  .pageTitle{
    text-align: center;
    width: 100%;
    font-size: 50px;
    margin: 10px 0px;
  }

  .description {
    width: 90%;
    text-align: left;
    font-size: 20px;
  }

  .void {
    display: none; 
  }

  .main-content{
    margin-top: 15px;
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0px;
    transition: 0.3s;
  }   
   
  .mobile-image {
    pointer-events: none;
    display:block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    margin-bottom: 15px;
  }

  .dialog-text {
    margin: 10px;
    font-size: 24px;
  }
}
</style>
