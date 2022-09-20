
<template>
    <div>
      <app-tabs :tabList="tabList" >
        <template v-slot:tabPanel-1> 
            <br>
            <h3>About me form</h3>
            <AboutMeAndCareerForm></AboutMeAndCareerForm>
        </template>
        <template v-slot:tabPanel-2> 
            <br> 
            <h3>Hobbies list</h3>
            <br> 
            <HobbieForm></HobbieForm>
        </template>
        <template v-slot:tabPanel-3> 
            <br>
            <h3>Personnal projects list</h3>
            <br> 
            <MainForm></MainForm>
        </template>
        <template v-slot:tabPanel-4> 
            <br>
            <h3>Career form</h3>
            <AboutMeAndCareerForm></AboutMeAndCareerForm>
        </template>
        <template v-slot:tabPanel-5>
            <br>
            <h3>Professional projects list</h3>
            <br> 
            <MainForm></MainForm>
        </template>
        <template v-slot:tabPanel-6> 
            <br>
            <h3>Job experiences list</h3>
            <br> 
            <MainForm></MainForm>
        </template>
        <template v-slot:tabPanel-7> 
            <br>
            <h3>Education list</h3>
            <br> 
            <MainForm></MainForm>
        </template>
        <template v-slot:tabPanel-8> 
            <br>
            <h3>Travels list</h3>
            <br>
            <TravelForm></TravelForm>
        </template>
      </app-tabs>
    </div>
</template>
  
<script>
import AppTabs from "./AppTabs.vue";
import AboutMeAndCareerForm from "./forms/AboutMeAndCareerForm.vue";
import HobbieForm from "./forms/HobbieForm.vue";
import MainForm from "./forms/MainForm.vue";
import TravelForm from "./forms/TravelForm.vue";
export default {
components: {
    AppTabs,
    AboutMeAndCareerForm,
    HobbieForm,
    MainForm,
    TravelForm
},

data() {
    return {
    tabList: [
     "About me",
     "Hobbies",
     "Personnal projects",
     "Career", 
     "Professional projects",
     "Job experience",
     "Education",
     "Travels"
    ],
    };
},
};
</script>


<style scoped>

.tabDesign{
    margin-right: 10px;
}
</style>