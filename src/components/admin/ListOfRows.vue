<template>
    <div class="list-of-rows">
        <div v-if="isShow">
            <w-button class="ma1 button" @click="isShow = !isShow"  bg-color="primary" >Add new</w-button>
            <ListRow @toggleShow="toggleShow($event)" 
            @removePost="removePost($event)"
            v-for="post in posts"
            :key=post.id
            :uid=post.id
            :title="post.title">
            </ListRow>
        </div>

        <div v-if="!isShow">
            <TravelForm v-if="formType === 'travels'" @toggleShow="toggleShow($event)" :id="postToEditId"></TravelForm>
            <MainForm v-else :formType="formType" @toggleShow="toggleShow($event)"  :id="postToEditId"></MainForm>
        </div>
    </div>
    
</template>


<script>
import ListRow from "./ListRow.vue";
import MainForm from './forms/MainForm.vue';
import TravelForm from './forms/TravelForm.vue';
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
    TravelForm
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
        var indexes = Object.keys(this.posts)  
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

.button {
    margin-bottom: 8px;
    margin-top: 20px;
    background-color: #282586;
}

button {
    border: 0;
    padding: 10px 26px;
    color: white;
    border-radius: 5px;
    font-size:13px;
}


</style>