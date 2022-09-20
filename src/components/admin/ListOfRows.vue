<template>
    <div class="list-of-rows">
        <div >
            <w-button class="ma1" bg-color="primary" >Add new</w-button>
        </div>
        <br>
        <ListRow
            v-for="post in posts"
            :key="post.id"
            :uid="post.id"
            :title="post.title">
         </ListRow>
    </div>

    
</template>


<script setup>
import { ref } from 'vue'
import ListRow from "./ListRow.vue";

const posts = ref([
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

</script>


<style scoped>


</style>