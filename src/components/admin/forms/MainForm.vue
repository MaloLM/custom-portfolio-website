<template>
    <form @submit.prevent="submitData()">
        <div class="container">
            <div class="top">
            <br>
            <w-input 
                class="mb3"
                outline
                label="Title"
                v-model="title"
                bg-color="grey-light5"
                required>
            </w-input>

            <w-input
                class="mb3"
                label="Date, '-' for nothing"
                outline
                v-model="date"
                bg-color="grey-light5"
                required>
            </w-input>

            <w-textarea 
                class="mt4"
                outline
                rows="5"
                label="Text description"
                v-model="description"
                bg-color="grey-light5"
                @input="countDescriptionWords"
                required>
            </w-textarea>
            <p :class=" descriptionWordCount <= 140 ? 'greenCount' :'redCount' ">{{descriptionWordCount}} words</p>
            <w-divider class="ma6"/>
            </div>

            <div class="right">
                <w-card 
                title="Image"
                title-class="grey"
                bg-color="grey-light5"
                class="fillSpace">
                    <input 
                    :required="!isImage"
                    type="file" 
                    ref="file" 
                    @change="readFile()"
                    accept="image/*" 
                    id="choose-file" 
                    name="choose-file">
                    <br><br>
                    <img v-if="isImage" :src="preview" class="image"/>
                </w-card>
            </div>

            <div class="top-left">
            <w-card class="fillSpace" >
                Tags
                <w-input 
                style="margin-top: 10px;"
                outline
                label="Add Skills (separator = '/'), '-' for nothing"
                v-model="skills"
                bg-color="grey-light5"
                required>     
                </w-input>
                <br>
                <w-input 
                outline
                label="Add technologies/tools (separator = '/'),'-' for nothing"
                v-model="ressources"
                bg-color="grey-light5"
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
                bg-color="grey-light5"
                label="Ressource name , '-' for nothing"
                required>
                </w-input>
                <br>
                <w-input
                outline
                v-model="ressourceLink"
                bg-color="grey-light5"
                label="Ressource link, '-' for nothing"
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
</template>

<script>
import databaseService from '@/services/databaseService';

export default {
    props:{
        id: String,
        formType: String,
    },
    data(props){
        return {
            descriptionWordCount: 0,
            showSuccessAlert: false,
            showErrorAlert: false,
            formTypePath: props.formType,
            postId: props.id,
            title: null,
            date: null,
            createdAt: null,
            description: null,
            image: false,
            example: null,
            preview: null,
            skills: null,
            ressources: null,
            ressourceName: null,
            ressourceLink: null, 
            retrievedPost: null,
            imageFile: null,
            isImage: false,
            loading: false,
        }
    },
    mounted(){
        console.log("mounting")
        console.log("ID", this.id)
        if(this.id != null && this.id != "null"){
            
            databaseService.getPostsByPathAndId(this.formTypePath, this.postId).on('value', (snapshot) => {
                this.retrievedPost = snapshot.val()

                this.title = this.retrievedPost.title
                this.date = this.retrievedPost.date
                this.description = this.retrievedPost.description
                this.preview = this.retrievedPost.image
                this.image = this.retrievedPost.image
                this.isImage = true
                this.skills = this.retrievedPost.skills
                this.ressources = this.retrievedPost.ressources
                this.ressourceName = this.retrievedPost.ressource.name
                this.ressourceLink = this.retrievedPost.ressource.link
                this.createdAt = this.retrievedPost.createdAt

            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            }); 
            this.countDescriptionWords()
        }
    },
    methods: {
        countDescriptionWords(){
            this.descriptionWordCount = this.description.split(' ').length;
        },
        cancelForm(){
            this.postId = null;
            window.scrollTo(0, 0);
            this.$emit('toggleShow', "null")
        },
        readFile() {
                this.file = this.$refs.file.files[0];
                if (
                    this.file.name.includes(".png") ||
                    this.file.name.includes(".jpg") ||
                    this.file.name.includes(".jpeg")
                ) {
                    this.isImage = true
                    this.preview = URL.createObjectURL(this.file);
                    this.imageFile = this.file
                } else {
                    this.isImage = false;
                }
        },
        submitData(){ 
            this.loading = true
            
            if(this.postId != null && this.post != "null"){
                const data = {
                    id: this.postId,
                    title: this.title,
                    date: this.date,
                    description: this.description,
                    image: this.image,
                    skills: this.skills,
                    ressources: this.ressources,
                    ressource: {
                        name: this.ressourceName,
                        link: this.ressourceLink
                    },
                    createdAt: this.createdAt
                }

                try{
                    const id = this.postId
                    if(this.isImage && this.imageFile == null){
                        databaseService.updatePostByPathAndId(this.formTypePath, id, data).then(() => {
                            this.loading = false
                            this.cancelForm()
                        });
                    } else{
                        databaseService.updatePostByPathAndId(this.formTypePath, id, data)
                        .then(() => {
                            let filename = this.createdAt + '-' + this.imageFile.name
                            databaseService.uploadFileThenUpdatePost(this.imageFile, this.formTypePath, id , filename)
                            this.postId = null;
                            this.loading = false
                            this.cancelForm()
                            console.log('object created')
                        });
                    }
                   
                } catch(err){
                    console.log(err)
                }

            } else if (this.postId == null || this.postId == 'null' ){
                var data = {
                    title: this.title,
                    date: this.date,
                    description: this.description,
                    image: "N/A",
                    skills: this.skills,
                    ressources: this.ressources,
                    ressource: {
                        name: this.ressourceName,
                        link: this.ressourceLink,
                    },
                    createdAt: new Date().getTime()
                }

                try{
                    databaseService.createPost(this.formTypePath, data)
                    .then(() => {
                        let filename = this.createdAt + '-' + this.imageFile.name
                        databaseService.uploadFileThenPushPost(this.imageFile , filename, this.formTypePath);
                        this.postId = null;
                        this.loading = false;
                        this.cancelForm();
                        console.log('object created')
                    });
                } catch(err){
                    console.log(err)
                }             
            }
        }
    }
}
</script>


<style scoped>
.container {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: 1fr 0.4fr 0.4fr 0.1fr; 
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
    max-width: 50% ;
    height: auto;
}

button {
    padding: 10px 40px;
    margin-top: 20px;
    margin-left: 10px;
}

.orange{
    background-color: #ff7300;
    color: white;
}

.greenCount{
    color: green;
    font-weight: bold;
    margin-left: 10px;
}

.redCount{
    color: red;
    font-weight: bold;
    margin-left: 10px;
}
</style>