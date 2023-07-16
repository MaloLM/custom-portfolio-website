<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the MIT License
https://opensource.org/licenses/MIT
-->

<template>
    <div>
      <app-tabs :tabList="tabList" >
        <template v-slot:tabPanel-1> 
            <h3>About me form</h3>
            <AboutMeForm formType="about-me"></AboutMeForm>
        </template>

        <template v-slot:tabPanel-2> 
            <h3>Hobbies</h3>
            <HobbieForm formTypeToShare="about-me/hobbies-and-interests"></HobbieForm>
        </template>

        <template v-slot:tabPanel-4> 
            <h3>Career form</h3>
            <CareerForm formType="career"></CareerForm>
        </template>

        <template v-slot:tabPanel-3> 
            <h3>Personnal projects</h3>
            <PersonnalProjectsForm formTypeToShare="about-me/personnal-projects"></PersonnalProjectsForm>
        </template>

        <template v-slot:tabPanel-5> 
            <h3>Job experiences</h3>
            <JobExperiencesForm formTypeToShare="career/job-experiences"></JobExperiencesForm>
        </template>

        <template v-slot:tabPanel-6>
            <h3>Professional projects</h3>
            <ProfessionnalProjectsForm formTypeToShare="career/professional-projects"></ProfessionnalProjectsForm>
        </template>
        
        <template v-slot:tabPanel-7> 
            <h3>Education list</h3>
            <EducationForm formTypeToShare="career/education"></EducationForm>
        </template>

        <template v-slot:tabPanel-9> 
            <h3>Curriculum Vitae</h3>
            <CurriculumVitae formType="curriculumVitae"></CurriculumVitae>
        </template>
      </app-tabs>
    </div>
</template>
  
<script>
import AppTabs from "./AppTabs.vue";
import AboutMeForm from "./forms/AboutMeForm.vue";
import CareerForm from "./forms/CareerForm.vue";
import HobbieForm from "./forms/HobbieForm.vue";
import PersonnalProjectsForm from "./forms/PersonnalProjectsForm.vue";
import ProfessionnalProjectsForm from "./forms/ProfessionnalProjectsForm.vue";
import JobExperiencesForm from "./forms/JobExperiencesForm.vue";
import EducationForm from "./forms/EducationForm.vue";
import CurriculumVitae from "./forms/CurriculumVitae.vue";

export default {
    components: {
        AppTabs,
        AboutMeForm,
        CareerForm,
        HobbieForm,
        PersonnalProjectsForm,
        ProfessionnalProjectsForm,
        JobExperiencesForm,
        EducationForm,
        CurriculumVitae,
    },
    data() {
        return {
            tabList: [
                "About me",
                "Hobbies",
                "Personnal projects",
                "Career", 
                "Job experience",
                "Professional projects",
                "Education",
                "CV",
            ],
        };
    },
};
</script>


<style scoped>
h3 {
    margin-top: 15px;
}
</style>