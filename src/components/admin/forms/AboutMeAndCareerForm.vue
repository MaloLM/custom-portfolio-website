<template>
    
    <br>

    <form @submit.prevent="this.writeUserData()">
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
            name="choose-file" 
            required>

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
</template>


<script>
import DataService from "../../../firebase";

export default {
    props:{
        formType: String
    },
    data(){
        return {
            title: null,
            description: null,
            image: null
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
        pushImage(){
            console.log("pushImage TODO")
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
        },
        pushFOrm(){
            const data = {
                title: this.title,
                description: this.description,
                image: this.image
            }
            DataService.createAboutMe(data)
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

.image{
    max-width: 100% ;
    height: auto;
}


</style>