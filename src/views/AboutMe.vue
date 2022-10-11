<template>
  <div class="aboutMe" >
    <div class="main-content">
      <div>
        <h1 class="pageTitle">{{title}}</h1>
      </div>
        
        <p class="description">{{description}}</p>
        <img v-if="image != null && image != ''"
          v-bind:src="image"/>
      <br/>
    </div>
  </div>
  <CardCaroussel title="Personnal projects" v-if="personnalProjectsPosts != null" :posts="personnalProjectsPosts"></CardCaroussel>
  <CardCaroussel title="Hobbies and interests" v-if="hobbiesAndInterestsPosts != null"  :posts="hobbiesAndInterestsPosts"></CardCaroussel>
</template>

<script>
  import CardCaroussel from '@/components/public/Card-caroussel.vue';
  import databaseService from '@/services/databaseService';
  
  export default {
    name: "about-me-view",
    components: { CardCaroussel, },
    data() {
      return {
        title: null,
        description: null,
        image: null,
        personnalProjectsPosts: null,
        hobbiesAndInterestsPosts: null,
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
      }
    },
    mounted() {
      databaseService.getAboutMeOrCareerData('about-me','title').on('value', (snapshot) => {
        this.title = snapshot.val()
        databaseService.getAboutMeOrCareerData('about-me', 'description').on('value', (snapshot) => {
          this.description = snapshot.val()
          databaseService.getAboutMeOrCareerData('about-me', 'image').on('value', (snapshot) => {
            this.image = snapshot.val()

            databaseService.getPersonnalProjects('about-me', 'image').on('value', (snapshot) => {
            
              let posts = this.sortByCreationDate(snapshot.val())
              this.personnalProjectsPosts = posts

              databaseService.getHobbiesAndInterests('about-me', 'image').on('value', (snapshot) => {

                let posts = this.sortByCreationDate(snapshot.val())
                this.hobbiesAndInterestsPosts = posts
              
              }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });
            
            }, (errorObject) => { console.log('The read failed: ' + errorObject.name); });
            
          }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 

        }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 
      
      }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 
    },
  };
</script>


<style scoped>
@media (max-width: 667px) {
  .pageTitle{
    text-align: center;
    font-size: 50px;
  }

  .description{
    font-size: 20px;
    text-align: left;
  }
  
  .main-content{
    margin-top: 15px;
    margin-left: 12px;
    margin-right: 12px;
    transition: 0.3s;
  }    
}
</style>
