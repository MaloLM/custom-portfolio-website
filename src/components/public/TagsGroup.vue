<template>
    <div v-if="parsedData != null">
        <w-tag 
        v-for="(tag) in parsedData" :key="tag"
        class="mr4"
        :bg-color="bgColor"
        :color="textColor"
        round
        lg>
        {{tag}}
        </w-tag>
    </div>
   
</template>


<script>
export default {
  name: 'Breakpoints',
  props:{
    unparsedData: String,
    bgColor: String,
    textColor: String,
  },
  data: () => ({
    parsedData: null
  }),
  components: {
  },
  methods: {
  },
  mounted(){
    console.log('before', this.unparsedData)
    this.parsedData = this.unparsedData.split("/");
    console.log('after', this.parsedData)
  },
};
</script>


<style scoped>
    
</style>