<template>
    <form @submit.prevent="logFormData()">
        <div class="container">
            
                <div class="top">

                <w-input 
                    class="mb3"
                    outline
                    label="Title"
                    v-model="title">
                </w-input>


                <w-textarea 
                    class="mt4"
                    outline
                    rows="10"
                    label="Text description"
                    v-model="description">
                </w-textarea>

                <w-divider class="ma6"/>
                </div>

                <div class="right">
                <w-card title="Image" title-class="grey" class="fillSpace">
                    <w-image
                    class="mr5"
                    :src="`${image}images/japanese-wave.png`"
                    :width="150"
                    :height="150"
                    >
                    </w-image>

                    <input type="file" @change="previewFiles"  accept="image/*" id="choose-file" name="choose-file">
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
                        v-model="skills">     
                    </w-input>

                    <br>

                    <w-input 
                        outline
                        label="Add technologies/tools (separator = ';')"
                        v-model="ressources">
                    </w-input>
                </w-card>
                </div>

                <div class="bottom-left">
                <w-card class="fillSpace" >
                    Ressource
                    <w-input style="margin-top: 10px;"
                        outline
                        v-model="ressourceName"
                        label="Ressource name">
                    </w-input>
                    
                    <br>

                    <w-input
                        outline
                        v-model="ressourceLink"
                        label="Ressource link">
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
export default {
    props:{
        formType: String
    },
    data(){
        return {
            title: "",
            description: "",
            image: 'https://antoniandre.github.io/wave-ui/',
            skills: "",
            ressources: "",
            ressourceName: "",
            ressourceLink: "",
        }
    },
    setup(props){
        console.log("main", props.formType)
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
        previewFiles(event) {
        if(event.target.files[0]){
            this.image =  event.target.files[0];
            }
        },
        passEvent(){
            window.scrollTo(0, 0);
            this.$emit('toggleShow', 'hello')
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