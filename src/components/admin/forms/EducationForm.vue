<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the MIT License
https://opensource.org/licenses/MIT
-->

<template>
    <div class="education">
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