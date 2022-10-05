<template>
  <div class="aboutMe" >
    <div class="main-content">
      <div>
        <h1 class="pageTitle">{{ title }}</h1>

      <div class="container">
          <div class="row-1-1">
            <p class="description">{{description}}</p>
          </div>
          <div class="row-1-2" style="display: flex; justify-content: center;" >
            <img v-if="image != null && image != ''"
              v-bind:src="image"
              />
          </div>
        </div>
        <br/>
      </div>

      <CardCaroussel title="Personnal projects" v-if="personnalProjectsPosts != null" :posts="personnalProjectsPosts"></CardCaroussel>

      <CardCaroussel title="Hobbies and interests" v-if="hobbiesAndInterestsPosts != null"  :posts="hobbiesAndInterestsPosts"></CardCaroussel>
      
    </div>
  </div>
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
        // console.log('BEFORE', posts)
        let array = []

        Object.entries(posts).forEach(([key, value]) => {
            // console.log('DURING', key)
            value['id'] = key
            // console.log('DURING', value)
            array.push(value)
        })

        array = array.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        // console.log('AFTER', posts)
        return array

      }
    },
    setup(){
    },
    mounted() {

      databaseService.getAboutMeOrCareerData('about-me','title').on('value', (snapshot) => {
        this.title = snapshot.val()
        databaseService.getAboutMeOrCareerData('about-me', 'description').on('value', (snapshot) => {
          this.description = snapshot.val()
          databaseService.getAboutMeOrCareerData('about-me', 'image').on('value', (snapshot) => {
            this.image = snapshot.val()

            databaseService.getPersonnalProjects('about-me', 'image').on('value', (snapshot) => {
            
              let posts = snapshot.val()
              posts = this.sortByCreationDate(posts)
              this.personnalProjectsPosts = posts

              databaseService.getHobbiesAndInterests('about-me', 'image').on('value', (snapshot) => {

              let posts = snapshot.val()
              posts = this.sortByCreationDate(posts)
              this.hobbiesAndInterestsPosts = posts
              
              }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
              });
            
            }, (errorObject) => {
              console.log('The read failed: ' + errorObject.name);
            });
            
          }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
          }); 

        }, (errorObject) => {
          console.log('The read failed: ' + errorObject.name);
        }); 
      
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      }); 

    },

  };
  </script>

<style scoped>
.pageTitle{
  font-size: 60px;
}

.container {
  display: grid; 
  grid-auto-flow: row dense; 
  grid-auto-columns: 1.2fr; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "row-1-1 row-1-2"; 
}
.row-1-1 { grid-area: row-1-1; }
.row-1-2 { grid-area: row-1-2; }

.description{
  font-size: 18px;
}

</style>
