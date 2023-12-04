<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <div>
      <!-- Use the 'app-tabs' component to create a tabbed interface -->
      <app-tabs :tabList="tabList" >
        
        <!-- Tab 1: About Me Form -->
        <template v-slot:tabPanel-1> 
          <h3>About me form</h3>
          <AboutMeForm formType="about-me"></AboutMeForm>
        </template>
  
        <!-- Tab 2: Hobbies Form -->
        <template v-slot:tabPanel-2> 
          <h3>Hobbies</h3>
          <HobbieForm formTypeToShare="about-me/hobbies-and-interests"></HobbieForm>
        </template>
  
        <!-- Tab 4: Career Form -->
        <template v-slot:tabPanel-4> 
          <h3>Career form</h3>
          <CareerForm formType="career"></CareerForm>
        </template>
  
        <!-- Tab 3: Personal Projects Form -->
        <template v-slot:tabPanel-3> 
          <h3>Personal projects</h3>
          <PersonnalProjectsForm formTypeToShare="about-me/personnal-projects"></PersonnalProjectsForm>
        </template>
  
        <!-- Tab 5: Job Experiences Form -->
        <template v-slot:tabPanel-5> 
          <h3>Job experiences</h3>
          <JobExperiencesForm formTypeToShare="career/job-experiences"></JobExperiencesForm>
        </template>
  
        <!-- Tab 6: Professional Projects Form -->
        <template v-slot:tabPanel-6>
          <h3>Professional projects</h3>
          <ProfessionnalProjectsForm formTypeToShare="career/professional-projects"></ProfessionnalProjectsForm>
        </template>
        
        <!-- Tab 7: Education List Form -->
        <template v-slot:tabPanel-7> 
          <h3>Education list</h3>
          <EducationForm formTypeToShare="career/education"></EducationForm>
        </template>
  
        <!-- Tab 8: Curriculum Vitae Form -->
        <template v-slot:tabPanel-8> 
          <h3>Curriculum Vitae</h3>
          <CurriculumVitae formType="curriculumVitae"></CurriculumVitae>
        </template>
        
      </app-tabs>
    </div>
  </template>
  
  
  <script>
  import AppTabs from "./AppTabs.vue"; // Import the 'AppTabs' component
  import AboutMeForm from "./forms/AboutMeForm.vue"; // Import the 'AboutMeForm' component
  import CareerForm from "./forms/CareerForm.vue"; // Import the 'CareerForm' component
  import HobbieForm from "./forms/HobbieForm.vue"; // Import the 'HobbieForm' component
  import PersonnalProjectsForm from "./forms/PersonnalProjectsForm.vue"; // Import the 'PersonnalProjectsForm' component
  import ProfessionnalProjectsForm from "./forms/ProfessionnalProjectsForm.vue"; // Import the 'ProfessionnalProjectsForm' component
  import JobExperiencesForm from "./forms/JobExperiencesForm.vue"; // Import the 'JobExperiencesForm' component
  import EducationForm from "./forms/EducationForm.vue"; // Import the 'EducationForm' component
  import CurriculumVitae from "./forms/CurriculumVitae.vue"; // Import the 'CurriculumVitae' component
  
  export default {
    components: {
      // Register imported components for use in this parent component
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
        // Define an array of tab names to be displayed in the 'AppTabs' component
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
  /* Apply a top margin of 15px to all <h3> elements within this component */
  h3 {
    margin-top: 15px;
  }
</style>
