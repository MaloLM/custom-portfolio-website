<template>
    <div class="job-experiences">
        <ListOfRows :formType="formTypeToShare"></ListOfRows>
    </div>
</template>


<script>
import ListOfRows from '../ListOfRows.vue';

export default {
  data(props) {
    return {
        formType: props.formTypeToShare
    }
  },
  components: {
    ListOfRows
  },
  props:{
    formTypeToShare: String
  },
  setup(props){
    console.log("main", props.formTypeToShare)
  },
  methods: {

  }
}
</script>


<style scoped>

</style>