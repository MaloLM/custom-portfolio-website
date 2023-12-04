<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <div v-if="parsedData != null" class="break">
        <span
        v-for="(tag) in parsedData" :key="tag"
        class="spacing"
        :style="style">
        {{tag}}
        </span>
    </div>
</template>


<script scoped>
export default {
  name: 'tag-group',
  props:{
    unparsedData: String,
    bgColor: String,
  },
  data: () => ({
    parsedData: null,
    backgroundColor: null,
  }),
  mounted(){
    this.parsedData = this.unparsedData.split("/");
    this.backgroundColor = this.bgColor
  },
  computed: {
    style () {
        return 'background-color: ' + this.backgroundColor;
      }
  }
};
</script>


<style scoped>
.spacing{
    margin: 3px;
    color:white;
    border: 0;
    border-radius: 20px;
    padding: 5px 15px;
    font-size: 16px;
}
.break {
  display: flex;
  flex-wrap: wrap;
}
</style>