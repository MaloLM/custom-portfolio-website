<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <div class="personnal-projects">
        <ListOfRows :formType="formTypeToShare"></ListOfRows>
    </div>
</template>


<script>
import ListOfRows from '../ListOfRows.vue';

export default {
  data() {
    return {}
  },
  components: {
    ListOfRows
  },
  props:{
    formTypeToShare: String
  },
}
</script>


<style scoped>
</style>