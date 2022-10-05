<template>
    <div class="job-experiences">
        <ListOfRows :formType="formTypeToShare"></ListOfRows>
    </div>
</template>


<script>
import ListOfRows from '../ListOfRows.vue';

export default {
  data() {
    return {
        // formType: props.formTypeToShare
    }
  },
  components: {
    ListOfRows
  },
  props:{
    formTypeToShare: String
  },
  setup(){},
  methods: {

  }
}
</script>


<style scoped>

</style>