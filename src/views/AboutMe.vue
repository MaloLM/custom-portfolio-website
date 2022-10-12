<template>
  <div class="aboutMe" >
    <div class="main-content">
      <img class="mobile-image" v-if="image != null && image != ''"
          v-bind:src="image"/>
      <div>
        <h1 class="pageTitle">Malo <br class="linebreak"/>Le Mestre</h1>
        <div class="container">
          <div class="description">
            <p class="description">{{description}}</p>
          </div>
          <div class="void"></div>
        </div>   
      </div>
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
.container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 0.5fr 0.5fr; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "description void"; 
}
.void { grid-area: void; }
.description { 
  grid-area: description;
  float: left;
}

.mobile-image {
  display:none;
  pointer-events: none;
}

.linebreak {
  display: none;
}

@media (max-width: 667px) {

  .linebreak {
    display: block;
  }
  .pageTitle{
    text-align: center;
    font-size: 50px;
  }

  .void {
    display: none; 
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

  .container {
    display: grid; 
    grid-auto-columns: 1fr; 
    grid-template-columns: 1fr 0fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      "description"; 
  }

  .mobile-image {
    pointer-events: none;
    display:block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    margin-bottom: 15px;
  }
}
</style>
