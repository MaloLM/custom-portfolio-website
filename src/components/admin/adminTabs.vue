
<template>
    <div>
      <app-tabs :tabList="tabList" >
        <template v-slot:tabPanel-1> 
            <br>
            <AboutMeForm></AboutMeForm>
        </template>
        <template v-slot:tabPanel-2> 
            <br> 
            <HobbieForm></HobbieForm>
        </template>
        <template v-slot:tabPanel-3> 
            <br>
            <MainForm></MainForm>
        </template>
        <template v-slot:tabPanel-4> 
            <br>
            <CareerForm></CareerForm>
        </template>
        <template v-slot:tabPanel-5>
            <br>
            <MainForm></MainForm>
        </template>
        <template v-slot:tabPanel-6> 
            <br>
            <MainForm></MainForm>
        </template>
        <template v-slot:tabPanel-7> 
            <br>
            <MainForm></MainForm>
        </template>
        <template v-slot:tabPanel-8> 
            <br>
            <TravelForm></TravelForm>
        </template>
      </app-tabs>
    </div>
</template>
  
<script>
import AppTabs from "./AppTabs.vue";
import AboutMeForm from "./forms/AboutMeForm.vue";
import HobbieForm from "./forms/HobbieForm.vue";
import MainForm from "./forms/MainForm.vue";
import CareerForm from "./forms/CareerForm.vue";
import TravelForm from "./forms/TravelForm.vue";
export default {
components: {
    AppTabs,
    AboutMeForm,
    HobbieForm,
    MainForm,
    CareerForm,
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