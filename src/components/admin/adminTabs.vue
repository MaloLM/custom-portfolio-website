
<template>
    <div>
      <app-tabs :tabList="tabList" >
        <template v-slot:tabPanel-1> 
            <br>
            <h3>About me form</h3>
            <AboutMeAndCareerForm formType="about-me"  ></AboutMeAndCareerForm>
        </template>
        <template v-slot:tabPanel-2> 
            <br> 
            <h3>Hobbies list</h3>
            <HobbieForm formTypeToShare="about-me/hobbies-and-interests"></HobbieForm>
        </template>
        <template v-slot:tabPanel-3> 
            <br>
            <h3>Personnal projects list</h3>
            <PersonnalProjectsForm formTypeToShare="about-me/personnal-projects"></PersonnalProjectsForm>
            <!-- <MainForm formType="about-me/personnal-projects"></MainForm> -->
        </template>
        <template v-slot:tabPanel-4> 
            <br>
            <h3>Career form</h3>
            <AboutMeAndCareerForm formType="career"></AboutMeAndCareerForm>
        </template>
        <template v-slot:tabPanel-5>
            <br>
            <h3>Professional projects list</h3>
            <ProfessionnalProjectsForm formTypeToShare="career/professional-projects"></ProfessionnalProjectsForm>
            <!-- <MainForm formType="career/professional-projects"></MainForm> -->
        </template>
        <template v-slot:tabPanel-6> 
            <br>
            <h3>Job experiences list</h3>
            <JobExperiencesForm formTypeToShare="career/job-experiences"></JobExperiencesForm>
            <!-- <MainForm formType="career/job-experiences"></MainForm> -->
        </template>
        <template v-slot:tabPanel-7> 
            <br>
            <h3>Education list</h3>
            <EducationForm formTypeToShare="career/education"></EducationForm>
            <!-- <MainForm formType="career/education"></MainForm> -->
        </template>
        <template v-slot:tabPanel-8> 
            <br>
            <h3>Travels list</h3>
            <TravelsAdministration formTypeToShare="travels"></TravelsAdministration>
            <!-- <TravelForm formTypeToShare="travels" ></TravelForm> -->
        </template>
      </app-tabs>
    </div>
</template>
  
<script>
import AppTabs from "./AppTabs.vue";
import AboutMeAndCareerForm from "./forms/AboutMeAndCareerForm.vue";
import HobbieForm from "./forms/HobbieForm.vue";
// import MainForm from "./forms/MainForm.vue";
// import TravelForm from "./forms/TravelForm.vue";
import PersonnalProjectsForm from "./forms/PersonnalProjectsForm.vue";
import ProfessionnalProjectsForm from "./forms/ProfessionnalProjectsForm.vue";
import JobExperiencesForm from "./forms/JobExperiencesForm.vue";
import EducationForm from "./forms/EducationForm.vue";
import TravelsAdministration from "./forms/TravelsAdministation.vue";
export default {
components: {
    AppTabs,
    AboutMeAndCareerForm,
    HobbieForm,
    // MainForm,
    // TravelForm,
    PersonnalProjectsForm,
    ProfessionnalProjectsForm,
    JobExperiencesForm,
    EducationForm,
    TravelsAdministration
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