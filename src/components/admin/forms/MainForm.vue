<template>
    <form @submit.prevent="logFormData()">
        <div class="container">

                <div class="top">

                <w-input 
                    class="mb3"
                    outline
                    label="Title"
                    v-model="title"
                    required>
                </w-input>


                <w-textarea 
                    class="mt4"
                    outline
                    rows="10"
                    label="Text description"
                    v-model="description"
                    required>
                </w-textarea>

                <w-divider class="ma6"/>
                </div>

                <div class="right">
                <w-card title="Image" title-class="grey" class="fillSpace">

                    <input 
                    type="file" 
                    ref="file" 
                    @change="readFile()"
                    accept="image/*" 
                    id="choose-file" 
                    name="choose-file"
                    required>

                    <br><br>
                        <img v-if="image" :src="preview" class="image"/>
                    <!-- <w-button class="ma1" bg-color="secondary" style="float:right;">Load image</w-button> -->
                </w-card>
                </div>

                <div class="top-left">
                <w-card class="fillSpace" >
                    Tags
                    <w-input 
                        style="margin-top: 10px;"
                        outline
                        label="Add Skills (separator = ';')"
                        v-model="skills"
                        required>     
                    </w-input>

                    <br>

                    <w-input 
                        outline
                        label="Add technologies/tools (separator = ';')"
                        v-model="ressources"
                        required>
                    </w-input>
                </w-card>
                </div>

                <div class="bottom-left">
                <w-card class="fillSpace" >
                    Ressource
                    <w-input style="margin-top: 10px;"
                        outline
                        v-model="ressourceName"
                        label="Ressource name"
                        required>
                    </w-input>
                    
                    <br>

                    <w-input
                        outline
                        v-model="ressourceLink"
                        label="Ressource link"
                        required>
                    </w-input>
                </w-card>
                </div>

                <div class="bottom">
                    <div style="float:right;">   

                        <button class="orange" type="button" @click='passEvent'>Cancel</button>
                        
                        <button style="float:right;">Submit</button>
                    </div>
                    
                </div>
        </div>
    </form>    
</template>

<script>
// import { getDatabase, ref, set } from "firebase/database";
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
    props:{
        formType: String
    },
    data(){
        return {
            title: null,
            description: null,
            image: false, //'https://antoniandre.github.io/wave-ui/',
            example: null,
            preview: null,
            skills: null,
            ressources: null,
            ressourceName: null,
            ressourceLink: null,
          
        }
    },
    setup(){
        console.log("on setup")
    },
    mounted(props) {

        console.log("mounted", props.formType);
        
        const issuesRef = firebase.database().ref('issues/');

        const test = issuesRef.on("value")

        console.log(test)
    },
    methods: {
        logFormData(){
            console.log(this.title)
            console.log(this.description)
            console.log(this.image)
            console.log(this.skills)
            console.log(this.ressources)
            console.log(this.ressourceName)
            console.log(this.ressourceLink)
        }, 
        passEvent(){
            window.scrollTo(0, 0);
            this.$emit('toggleShow', 'hello') // TODO
        },
        readFile() {
            this.example = this.$refs.file.files[0];
            if (
                this.example.name.includes(".png") ||
                this.example.name.includes(".jpg")
            ) {
                this.image = true;
                this.preview = URL.createObjectURL(this.example);
            } else {
                this.image = false;
            }
        }
    }
}
</script>


<style scoped>
    
.container {
  display: grid; 
  /* grid-auto-flow: row dense; */
  grid-auto-columns: 1fr; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr 0.1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "top top"
    "top-left right"
    "bottom-left right"
    "bottom bottom"; 
}
.top { grid-area: top; }
.bottom { 
    grid-area: bottom;
 }
.right { grid-area: right; }
.top-left { grid-area: top-left; }
.bottom-left { grid-area: bottom-left; }


.fillSpace{
    display: flex;
    flex-flow: column;
    margin: 10px;
    height: 90%;
}

.image{
    max-width: 100% ;
    height: auto;
}

button {
    background-color: #2d467d;
    border: 0;
    padding: 10px 40px;
    margin-top: 20px;
    margin-left: 10px;
    /* margin-left: 10px; */
    color: white;
    border-radius: 20px;
    font-size:13px;
}

.orange{
    background-color: #ff7300;
    color: white;
}


</style>