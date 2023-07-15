<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the MIT License
https://opensource.org/licenses/MIT
-->

<template>
<form @submit.prevent="this.uploadCV()">
    <w-card 
    title="Upload CV - pdf file only" 
    title-class="grey"  
    bg-color="grey-light5">
        <input 
        type="file" 
        ref="file" 
        @change="readFile()"
        accept=".pdf" 
        id="choose-file" 
        bg-color="grey-light5"
        name="choose-file"
        required>

        <div v-if="file">
            <h3>{{filename}}</h3>
        </div>
    </w-card>

    <br>
    
    <div style="float:right;">
        <button>Submit</button>
    </div>
</form>
<br>
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
    data() {
        return {
            showSuccessAlert: false,
            showErrorAlert: false,
            isCV: null,
            filename: null,
            file: null,
        }
    },
    props:{
        formType: String
    },
    methods: {
        readFile() {
            this.file = this.$refs.file.files[0];
            
            if(this.file){
                if (this.file.name.includes(".pdf")) {
                    this.filename = this.file.name
                    this.isCV = true
                } else {
                    this.isCV = false;
                    this.filename = false;
                }
            } else {
                this.showErrorAlert = true
            }
        },
        uploadCV(){
            try{
                if(this.file != null && this.filename != null){
                    let filename = this.filename
                    if(this.confirmEnding(filename, '.pdf')){
                        filename = filename.replace(/.pdf+$/, ''); 
                    }
                    databaseService.uploadCurriculumVitae(this.file, filename)
                    this.showSuccessAlert = true
                }
            } catch(err){
                this.showErrorAlert = true
            }
        },
        confirmEnding(string, target) {
            if (string.substr(-target.length) === target) {
                return true;
            } else {
                return false;
            }
        }
    }
}
</script>


<style scoped>
form {
    margin-top: 20px;
}

w-alert {
    margin: 20px;
}
</style>