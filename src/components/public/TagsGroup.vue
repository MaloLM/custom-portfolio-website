<template>
    <div v-if="parsedData != null">
        <w-tag 
        v-for="(tag) in parsedData" :key="tag"
        class="spacing"
        :bg-color="bgColor"
        :color="textColor"
        round xl>
        {{tag}}
        </w-tag>
    </div>
</template>


<script scoped>
export default {
  name: 'tag-group',
  props:{
    unparsedData: String,
    bgColor: String,
    textColor: String,
  },
  data: () => ({
    parsedData: null
  }),
  mounted(){
    this.parsedData = this.unparsedData.split("/");
  },
};
</script>


<style scoped>
.spacing{
    margin: 3px;
}
</style>