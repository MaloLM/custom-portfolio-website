<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the MIT License
https://opensource.org/licenses/MIT
-->

<template>
    <div class="list-of-rows">
        <div v-if="isShow">
            <button @click="isShow = !isShow">Add new</button>
  
            <ListRow 
            @toggleShow="toggleShow($event)" 
            @removePost="removePost($event)"
            v-for="post in posts"
            :key=post.id
            :id=post.id
            :title="post.title">
            </ListRow>
        </div>
        <div v-if="!isShow">
            <MainForm 
            @toggleShow="toggleShow($event)"
            :id="postToEditId"
            :formType="formType"
            ></MainForm>
        </div>
    </div>
</template>


<script>
import ListRow from "./Row.vue";
import MainForm from './forms/MainForm.vue';
import databaseService from '@/services/databaseService';

export default {
  data() {
    return {
        postToEditId: null,
        isShow: true,
        posts: null,
    }
  },
  components: {
    ListRow,
    MainForm,
},
  props:{
    formType: String
  },
  setup(){},
  methods: {
    toggleShow(postId){
      if(postId == "null"){
        this.postToEditId = null
      } else {
        this.postToEditId = postId
      }
        this.isShow = !this.isShow
    },
    removePost(id){
      databaseService.removePost(this.formType, id)
    }
  },
  mounted() {
    databaseService.getPosts(this.formType).on('value', (snapshot) => {
      this.posts = snapshot.val()
      let indexes = Object.keys(this.posts)  
      if(indexes.length){
        indexes.forEach(element => {
          this.posts[element]['id'] = element
        });
      }
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    }); 
  }
}
</script>


<style scoped>
button {
    padding: 10px 26px;
    border-radius: 5px;
    margin-bottom: 15px;
    margin-top: 15px;
}

.dark button {
  border-style: solid;
  border-color: rgba(166, 166, 166, 0.5);
}
</style>