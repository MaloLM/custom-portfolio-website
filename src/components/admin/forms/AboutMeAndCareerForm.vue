<template>
    
    <br>

    <form @submit.prevent="this.writeUserData()">
        <w-input
        class="mb3"
        outline
        label= "Title"
        v-model="title">
        </w-input>

        <w-textarea
        class="mt4"
        outline
        rows="10"
        label= "Description"
        v-model="description">
        </w-textarea>

        <br>

        <w-card title="Image" title-class="grey">
            <input type="file" @change="previewFiles"  accept="image/*" id="choose-file" name="choose-file">
        </w-card>

        <br>
        
        <div style="float:right;">
            <button>Submit</button>
        </div>
    </form>
</template>


<script>
import { getDatabase, ref, set } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/storage';

export default {
    props:{
        formType: String
    },
    data(){
        return {
            title: "",
            description: "",
            image: ""
        }
    },
    setup(props){
        console.log("aboutme or career")
        console.log(props.formType)
    },
    methods: {
        logFormData(){
            console.log(this.title)
            console.log(this.description)
            console.log(this.image)

        }, 
        previewFiles(event) {
        if(event.target.files[0]){
            this.image =  event.target.files[0];
            }
        },
        loadFormData(){
            this.logFormData()
            // const tmp = '/pages/about-me/title'
            console.log("D")
                firebase.database().ref('/pages/' + this.formType + '/').set({
                title: this.title,
                description: this.description 
            });
            console.log("F")
        },
        writeUserData() {
            const db = getDatabase();
            console.log("D")
            set(ref(db, '/pages/about-me/'), {
                title: this.title,
                description: this.description 
            });
            }
    }
}
</script>


<style scoped> 
button {
    background-color: #2d467d;
    border: 0;
    padding: 10px 40px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
    font-size:13px;
}

</style>