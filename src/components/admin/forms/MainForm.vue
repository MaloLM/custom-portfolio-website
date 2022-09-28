<template>
    <form @submit.prevent="submitData()">
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
                    name="choose-file">

                    <br><br>
                        <img v-if="image" :src="preview" class="image"/>
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

                        <button class="orange" type="button" @click='cancelForm'>Cancel</button>
                        
                        <button style="float:right;">Submit</button>
                    </div>
                    
                </div>
        </div>
    </form>
    <!-- <w-transition-expand y>
        <w-alert v-if="showSuccessAlert" dismiss success class="alerts">Data was successfully submitted</w-alert>
        <w-alert v-if="showErrorAlert" dismiss error>Data failted to get submitted</w-alert>
    </w-transition-expand> -->
</template>

<script>
import databaseService from '@/services/databaseService';
import { toNumber } from '@vue/shared';


export default {
    props:{
        id: String,
        formType: String,
    },
    data(props){
        return {
            showSuccessAlert: false,
            showErrorAlert: false,
            formTypePath: props.formType,
            postId: props.id,
            title: null,
            description: null,
            image: false, //'https://antoniandre.github.io/wave-ui/',
            example: null,
            preview: null,
            skills: null,
            ressources: null,
            ressourceName: null,
            ressourceLink: null, 
            retrievedPost: null,
        }
    },
    setup(){
        console.log("on setup")
    },
    mounted() {
        console.log("mounted", this.formTypePath);
        console.log("before",this.postId)
        this.postId = parseInt(this.postId) ;
        console.log(this.postId)
        console.log(typeof(this.postId))

        if(!isNaN(this.postId)){ //TODO choose this method orr the bottom one
            databaseService.getPostsByPathAndId(this.formTypePath, this.postId).on('value', (snapshot) => {
                console.log(snapshot.val())
                this.retrievedPost = snapshot.val()
                this.title = this.retrievedPost.title
                this.preview = this.retrievedPost.image
                this.image = this.retrievedPost.image
                this.description = this.retrievedPost.description
                this.skills = this.retrievedPost.skills
                this.ressources = this.retrievedPost.ressources
                this.ressourceName = this.retrievedPost.ressource.name
                this.ressourceLink = this.retrievedPost.ressource.link

            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            }); 
        }
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
        cancelForm(){
            window.scrollTo(0, 0);
            this.$emit('toggleShow', "null") // TODO
        },
        readFile() {
            this.example = this.$refs.file.files[0];
            if (
                this.example.name.includes(".png") ||
                this.example.name.includes(".jpg") ||
                this.example.name.includes(".jpeg")
            ) {
                this.image = true;
                this.preview = URL.createObjectURL(this.example);
            } else {
                this.image = false;
            }
        },
        submitData(){
            if(!isNaN(this.postId)){
                console.log("is a number")
                console.log(this.postId)
                const data = {
                    id: this.postId,
                    title: this.title,
                    description: this.description,
                    image: this.image,
                    skills: this.skills,
                    ressources: this.ressources,
                    ressouce: {
                        ressourceName: this.ressourceName,
                        ressourceLink: this.ressourceLink
                    }
                }

                try{
                    databaseService.updatePostByPathAndId(this.formTypePath, this.postId, data)
                    this.cancelForm()
                } catch(err){
                    alert(err)
                }

            } else if (isNaN(this.postId) || this.postId == null){
                console.log("Not a number")
                console.log(this.postId)
                var data = {
                    id: this.postId,
                    title: this.title,
                    description: this.description,
                    image: this.image,
                    skills: this.skills,
                    ressources: this.ressources,
                    ressouce: {
                        ressourceName: this.ressourceName,
                        ressourceLink: this.ressourceLink
                    }
                }

                console.log(data)
                
                databaseService.getIdCount(this.formTypePath).on('value', (snapshot) => {
                    console.log("a", id)
                    var id = snapshot.val()
                    console.log("B", id)

                    if(isNaN(id)){
                        id = toNumber(id)
                    }

                    data['id'] = id                    

                    console.log("C", id)

                    databaseService.createPost(this.formTypePath, id, data)
                    console.log("D")
                    
                    console.log("E")

                }, (errorObject) => {
                    console.log('The process failed: ' + errorObject.name);
                }); 

                

                // databaseService.createPost(this.formTypePath, id, children )
                
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