<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the MIT License
https://opensource.org/licenses/MIT
-->

<template>
    <form @submit.prevent="this.pushForm()">
        <w-input
        class="mb3 spacing"
        outline
        label= "First name"
        v-model="firstName"
        bg-color="grey-light5"
        required>
        </w-input>

        <w-input
        class="mb3 spacing"
        outline
        label= "Last name"
        v-model="lastName"
        bg-color="grey-light5"
        required>
        </w-input>

        <w-textarea
        class="mt4 spacing"
        outline
        rows="4"
        label= "Description"
        v-model="description"
        bg-color="grey-light5"
        required>
        </w-textarea>

        <w-card 
        title="Image"
        title-class="grey" 
        bg-color="grey-light5"
        class="spacing">
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
        
        <div class="spacing" style="float:right;">
            <button>Submit</button>
        </div>
    </form>
    <br>
    <br>
    <w-transition-expand y>
        <w-alert v-if="showSuccessAlert"  dismiss success class="alerts">Data was successfully submitted</w-alert>
        <w-alert v-if="showErrorAlert" dismiss error>Data failed to get submitted</w-alert>
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
            firstName: null,
            lastName: null,
            description: null,
            isImage: null,
            image: null,
            imageFile: null,
        }
    },
    setup(){},
    methods: {
        readFile() {
            this.file = this.$refs.file.files[0];
            
            if(this.file){
                if (
                this.file.name.includes(".png") ||
                this.file.name.includes(".jpg") ||
                this.file.name.includes(".jpeg")
                ) {
                    this.isImage = true
                    this.image = true;
                    this.imageFile = this.file
                    this.preview = URL.createObjectURL(this.file);
                } else {
                    this.image = false;
                    this.isImage = false;
                }
            } else {
                this.showErrorAlert = true
            }
        },
        pushForm(){
            try{
                if(this.isImage == null && this.imageFile == null){
                    var children = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        description: this.description,
                    }
                    databaseService.updatePost(this.formType, children)
                    this.showSuccessAlert = true
                } else if(this.imageFile != null){
                    databaseService.uploadFileThenUpdateAboutMe(this.formType, this.imageFile, this.firstName, this.lastName, this.description)
                    this.showSuccessAlert = true
                }
            } catch(err){
                this.showErrorAlert = true
            }
        },
        
    },
    mounted(){
        databaseService.getAboutMeOrCareerData(this.formType, 'firstName').on('value', (snapshot) => {
            this.firstName = snapshot.val()

            databaseService.getAboutMeOrCareerData(this.formType, 'lastName').on('value', (snapshot) => {
                this.lastName = snapshot.val()
                
                databaseService.getAboutMeOrCareerData(this.formType, 'description').on('value', (snapshot) => {
                    this.description = snapshot.val()

                    databaseService.getAboutMeOrCareerData(this.formType, 'image').on('value', (snapshot) => {
                        this.image = snapshot.val()
                        this.preview = snapshot.val()

                    }, (errorObject) => {
                        console.log('The read failed: ' + errorObject.name);
                    }); 
                }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 
            }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 
        }, (errorObject) => { console.log('The read failed: ' + errorObject.name); }); 
    }
}
</script>


<style scoped> 
button {
    /* override */
    padding: 10px 40px;
    margin-top: 0px;
}

.image{
    max-width: 250px ;
    height: auto;
}

.alerts{
    margin-right: 10px;
}

.spacing {
    margin: 20px;
}

</style>