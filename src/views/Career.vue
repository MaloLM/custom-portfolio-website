<template>
  <div class="main-content">
    <h1 class="pageTitle">{{ title }}</h1>
    <div class="container">
       <p class="description">{{description}}</p>
    </div>
  </div>

  <div class="row-3">
    <CardCaroussel title="Job experience" :posts="jobExperiences"></CardCaroussel>
  </div>
  <div class="row-4">
    <CardCaroussel title="Professionnal projects" :posts="professionalProjects"></CardCaroussel>
  </div>
  <div class="row-5">
    <CardCaroussel title="Education" :posts="education"></CardCaroussel>
  </div>
</template>

<script>
import CardCaroussel from '@/components/public/Card-caroussel.vue';
import databaseService from '@/services/databaseService';

export default {
  name: "career",
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
    sortByCreationDate(posts) {
      let size = Object.keys(posts).length;

      if(size > 0) {

        let array = []

        Object.entries(posts).forEach(([key, value]) => {
              value['id'] = key
              array.push(value)
        })

        array = array.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        return array
      } else {
        console.log("error: empty object")
      }
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
            
            let posts = this.sortByCreationDate(snapshot.val())
            this.jobExperiences = posts

            databaseService.getProfessionalProjects().on('value', (snapshot) => {
              
              let posts = this.sortByCreationDate(snapshot.val())
              this.professionalProjects  = posts

              databaseService.getEducation().on('value', (snapshot) => {

                let posts = this.sortByCreationDate(snapshot.val())
                this.education  = posts

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

.container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 0.5fr 0.5fr; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "description void"; 
}
.description { grid-area: description; }
.void { grid-area: void; }
.row-3 {
  margin-top: 25px;
}

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

  .container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1fr 0fr; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "description void"; 
}
  
  .void {
    display: none;
  }
}
</style>
  