<template>
    
    <br>
    <form @submit.prevent="this.pushForm()">
        <w-input
        class="mb3"
        outline
        label= "Title"
        v-model="title"
        required>
        </w-input>

        <w-textarea
        class="mt4"
        outline
        rows="10"
        label= "Description"
        v-model="description"
        required>
        </w-textarea>

        <br>

        <w-card title="Image" title-class="grey">
            <input 
            type="file" 
            ref="file" 
            @change="readFile()"
            accept="image/*" 
            id="choose-file" 
            name="choose-file">

            <div v-if="image">
                <br>
            </div>
            <img v-if="image" :src="preview" class="image" />
            
        </w-card>

        <br>
        
        <div style="float:right;">
            <button>Submit</button>
        </div>
    </form>
    <br>
    <br>
    <w-transition-expand y>
        <w-alert v-if="showSuccessAlert"  dismiss success class="alerts">Data was successfully submitted</w-alert>
        <w-alert v-if="showErrorAlert" dismiss error>Data failted to get submitted</w-alert>
    </w-transition-expand>
</template>


<script>
import databaseService from '@/services/databaseService';


export default {
    props:{
        formType: String
    },
    data(){
        return {
            showSuccessAlert: false,
            showErrorAlert: false,
            title: null,
            description: null,
            image: null,
            imageFile: null,
        }
    },
    setup(props){
        console.log(props.formType)
    },
    methods: {
        readFile() {
            this.file = this.$refs.file.files[0];
            if (
                this.file.name.includes(".png") ||
                this.file.name.includes(".jpg") ||
                this.file.name.includes(".jpeg")
            ) {
                this.image = true;
                this.imageFile = this.file
                this.preview = URL.createObjectURL(this.file);
            } else {
                this.image = false;
            }
        },
        pushForm(){
            try{
                databaseService.uploadFileThenUpdateAboutMe(this.formType, this.imageFile, this.title, this.description)
                // databaseService.updateAboutMeOrCareerData(this.formType, this.title, this.description, this.imageFile)
                this.showSuccessAlert = true
            } catch(err){
                this.showErrorAlert = true
            }
            
        },
        
    },
    mounted(){
        databaseService.getAboutMeOrCareerData(this.formType, 'title').on('value', (snapshot) => {
            this.title = snapshot.val()
            databaseService.getAboutMeOrCareerData(this.formType, 'description').on('value', (snapshot) => {
                this.description = snapshot.val()

                databaseService.getAboutMeOrCareerData(this.formType, 'image').on('value', (snapshot) => {
                    this.image = snapshot.val()
                    this.preview = snapshot.val()

                }, (errorObject) => {
                    console.log('The read failed: ' + errorObject.name);
                }); 

            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            }); 

        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        }); 

        

       
    }

}
</script>


<style scoped> 
button {
    background-color: #2d467d;
    border: 0;
    padding: 10px 40px;
    margin-top: 0px;
    color: white;
    border-radius: 20px;
    font-size:13px;
}

.image{
    max-width: 100% ;
    height: auto;
}

.alerts{
    margin-right: 10px;
}


</style>