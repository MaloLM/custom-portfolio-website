<template>
    <div class="job-experiences">
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