<template>
  <div class="main-content">
    <h1 class="pageTitle">{{ title }}</h1>

    <div class="container">
      <div class="row-1-1">
        <p class="description">{{description}}</p>
      </div>
      <div class="row-1-2" style="display: flex; justify-content: center;">
        <img 
        v-bind:src="image"
        width="250"/>
      </div>
    </div>
    <br>
    <div class="row-3">
        <h1>Job experience</h1>
        <CardCaroussel :posts="jobExperiences"></CardCaroussel>
      </div>
      <div class="row-4">
        <h1>Professionnal projects </h1>
        <CardCaroussel :posts="professionalProjects"></CardCaroussel>
      </div>
      <div class="row-5">
        <h1>Education </h1>
        <CardCaroussel :posts="education"></CardCaroussel>
      </div>
  </div>
</template>

<script>
  import CardCaroussel from '@/components/public/card-caroussel.vue';
  import databaseService from '@/services/databaseService';
  
  export default {
    name: "career-view",
    components: {
       CardCaroussel, 
      },
    data() {
      return {
        title: null,
        description: null,
        image: null,
        jobExperiences: null,
        professionalProjects: null,
        education: null,
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
      databaseService.getAboutMeOrCareerData('career','title').on('value', (snapshot) => {
        this.title = snapshot.val()

        databaseService.getAboutMeOrCareerData('career','description').on('value', (snapshot) => {
          this.description = snapshot.val()

          databaseService.getAboutMeOrCareerData('career','image').on('value', (snapshot) => {
            this.image = snapshot.val()

            databaseService.getJobExperiences().on('value', (snapshot) => {
              
              let posts = snapshot.val()
              posts = this.sortByCreationDate(posts)
              this.jobExperiences = posts

              databaseService.getProfessionalProjects().on('value', (snapshot) => {
                
                let posts = snapshot.val()
                posts = this.sortByCreationDate(posts)
                this.professionalProjects  = posts


                databaseService.getEducation().on('value', (snapshot) => {

                  let posts = snapshot.val()
                  posts = this.sortByCreationDate(posts)
                  this.education  = posts


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
  grid-auto-columns: 1fr; 
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
  