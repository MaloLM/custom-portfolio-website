<template>
    <div class="list-of-rows">
        <div v-if="isShow">
            <w-button class="ma1 button-spacing" @click="isShow = !isShow"  bg-color="primary" >Add new</w-button>
            <ListRow
            v-for="post in posts"
            :key="post.id"
            :uid="post.id"
            :title="post.title">
            </ListRow>
        </div>

        <div v-if="!isShow">
            <TravelForm v-if="formType === 'travels'" @toggleShow="toggleShow($event)"></TravelForm>
            <MainForm v-else :formType="formType" @toggleShow="toggleShow($event)"></MainForm>
        </div>
    </div>
    
</template>


<script>
import { ref } from 'vue'
import ListRow from "./ListRow.vue";
import MainForm from './forms/MainForm.vue';
import TravelForm from './forms/TravelForm.vue';

export default {
  data() {
    return {
        isShow: true,
        posts: ref([
            { id: 1, title: 'My journey with Vue' },
            { id: 2, title: 'Blogging with Vue' },
            { id: 3, title: 'Why Vue is so fun' },
            { id: 4, title: 'My journey with Vue' },
            { id: 5, title: 'Blogging with Vue' },
            { id: 6, title: 'Why Vue is so fun' },
            { id: 7, title: 'Why Vue is so fun' },
            { id: 8, title: 'My journey with Vue' },
            { id: 9, title: 'Blogging with Vue' },
            { id: 10, title: 'Why Vue is so fun' },
        ])
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
  setup(props){
    console.log("main", props.formType)
  },
  methods: {
    toggleShow(){
        this.isShow = !this.isShow
    }
  }
}

</script>


<style scoped>

.button-spacing {
    margin-bottom: 8px;
    margin-top: 20px;
}
</style>