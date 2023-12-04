<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <!-- Form element with submit event handler -->
    <form @submit.prevent="submitData()">
        <div class="container">
            <div class="top">
            <br>
            <!-- Input field for Title -->
            <w-input
                class="mb3"
                outline
                label="Title"
                v-model="title"
                bg-color="grey-light5"
                required>
            </w-input>

            <!-- Input field for Date -->
            <w-input
                class="mb3"
                label="Date, '-' for nothing"
                outline
                v-model="date"
                bg-color="grey-light5"
                required>
            </w-input>

            <!-- Textarea for Text description -->
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
            <!-- Display word count with class based on condition -->
            <p :class=" descriptionWordCount <= 140 ? 'greenCount' :'redCount' ">{{descriptionWordCount}} words</p>
            <w-divider class="ma6"/>
            </div>

            <div class="right">
                <!-- Card for Image -->
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
                    <!-- Display image if available -->
                    <img v-if="isImage" :src="preview" class="image"/>
                </w-card>
            </div>

            <div class="top-left">
            <!-- Card for Tags -->
            <w-card class="fillSpace" >
                Tags
                <!-- Input field for Skills -->
                <w-input
                style="margin-top: 10px;"
                outline
                label="Add Skills (separator = '/'), '-' for nothing"
                v-model="skills"
                bg-color="grey-light5"
                required>     
                </w-input>
                <br>
                <!-- Input field for Technologies/Tools -->
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
            <!-- Card for Resource -->
            <w-card class="fillSpace" >
                Resource
                <!-- Input field for Resource Name -->
                <w-input style="margin-top: 10px;"
                outline
                v-model="ressourceName"
                bg-color="grey-light5"
                label="Resource name , '-' for nothing"
                required>
                </w-input>
                <br>
                <!-- Input field for Resource Link -->
                <w-input
                outline
                v-model="ressourceLink"
                bg-color="grey-light5"
                label="Resource link, '-' for nothing"
                required>
                </w-input>
            </w-card>
            </div>
            <div class="bottom">
                <div style="float:right;">   
                    <!-- Cancel button -->
                    <button class="orange" type="button" @click='cancelForm'>Cancel</button>
                    <!-- Submit button -->
                    <button style="float:right;">Submit</button>
                </div>
            </div>
        </div>
    </form>
</template>


<script>
    import databaseService from '@/services/databaseService';

    export default {
        props: {
            id: String,
            formType: String,
        },
        data(props) {
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
        mounted() {
            if (this.id != null && this.id != "null") {

                // Fetch post data from the database
                databaseService.getPostsByPathAndId(this.formTypePath, this.postId).on('value', (snapshot) => {
                    this.retrievedPost = snapshot.val()

                    // Populate form fields with retrieved data
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
            countDescriptionWords() {
                // Count words in the description field
                this.descriptionWordCount = this.description.split(' ').length;
            },
            cancelForm() {
                // Reset postId and emit event to toggle form display
                this.postId = null;
                window.scrollTo(0, 0);
                this.$emit('toggleShow', "null")
            },
            readFile() {
                // Read and validate the selected image file
                this.file = this.$refs.file.files[0];
                if (
                    this.file.name.includes(".png") ||
                    this.file.name.includes(".jpg") ||
                    this.file.name.includes(".jpeg") ||
                    this.file.name.includes(".PNG") ||
                    this.file.name.includes(".JPG") ||
                    this.file.name.includes(".JPEG")
                ) {
                    this.isImage = true
                    this.preview = URL.createObjectURL(this.file);
                    this.imageFile = this.file
                } else {
                    this.isImage = false;
                }
            },
            submitData() {
                this.loading = true

                if (this.postId != null && this.post != "null") {
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

                    try {
                        const id = this.postId
                        if (this.isImage && this.imageFile == null) {
                            // Update post data without changing the image
                            databaseService.updatePostByPathAndId(this.formTypePath, id, data).then(() => {
                                this.loading = false
                                this.cancelForm()
                            });
                        } else {
                            // Update post data and upload a new image
                            databaseService.updatePostByPathAndId(this.formTypePath, id, data)
                                .then(() => {
                                    let filename = this.createdAt + '-' + this.imageFile.name
                                    databaseService.uploadFileThenUpdatePost(this.imageFile, this.formTypePath, id, filename)
                                    this.postId = null;
                                    this.loading = false
                                    this.cancelForm()
                                    console.log('object created')
                                });
                        }

                    } catch (err) {
                        console.log(err)
                    }

                } else if (this.postId == null || this.postId == 'null') {
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

                    try {
                        // Create a new post and upload an image
                        databaseService.createPost(this.formTypePath, data)
                            .then(() => {
                                let filename = this.createdAt + '-' + this.imageFile.name
                                databaseService.uploadFileThenPushPost(this.imageFile, filename, this.formTypePath);
                                this.postId = null;
                                this.loading = false;
                                this.cancelForm();
                                console.log('object created')
                            });
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        }
    }
</script>


<style scoped>
/* Scoped style block for Vue component */

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
/* Styling for a grid container with specific grid layout */

.top { grid-area: top; }
/* Styling for the element with class 'top' within the grid */

.bottom { 
    grid-area: bottom;
}
/* Styling for the element with class 'bottom' within the grid */

.right { grid-area: right; }
/* Styling for the element with class 'right' within the grid */

.top-left { grid-area: top-left; }
/* Styling for the element with class 'top-left' within the grid */

.bottom-left { grid-area: bottom-left; }
/* Styling for the element with class 'bottom-left' within the grid */

.fillSpace{
    display: flex;
    flex-flow: column;
    margin: 10px;
    height: 90%;
}
/* Styling for elements with class 'fillSpace' - a flex container */

.image{
    max-width: 50% ;
    height: auto;
}
/* Styling for elements with class 'image' - setting maximum width */

button {
    padding: 10px 40px;
    margin-top: 20px;
    margin-left: 10px;
}
/* Styling for button elements */

.orange{
    background-color: #ff7300;
    color: white;
}
/* Styling for elements with class 'orange' - sets background color and text color */

.greenCount{
    color: green;
    font-weight: bold;
    margin-left: 10px;
}
/* Styling for elements with class 'greenCount' - sets text color and font weight */

.redCount{
    color: red;
    font-weight: bold;
    margin-left: 10px;
}
/* Styling for elements with class 'redCount' - sets text color and font weight */
</style>
