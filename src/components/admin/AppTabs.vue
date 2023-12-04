<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
  <!-- A container div that may have 'flex' class based on the 'variant' value -->
  <div
    :class="{
      flex: variant === 'horizontal', // Apply 'flex' class if 'variant' is 'horizontal'
    }"
  >
    <!-- An unordered list that may have 'flex' class based on the 'variant' value -->
    <ul
      :class="{
        flex: variant === 'vertical', // Apply 'flex' class if 'variant' is 'vertical'
      }"
    >
      <!-- Loop through 'tabList' and create list items -->
      <li v-for="(tab, index) in tabList" :key="index">
        <!-- Label element for the tab with dynamic 'for' attribute and text content -->
        <label :for="`${index}`" v-text="tab" />

        <!-- Input element for tab selection with dynamic attributes -->
        <input
          :id="`${index}`"
          type="radio"
          :name="`tab`"
          :value="index + 1"
          v-model="activeTab"
        />
      </li>
    </ul>

    <!-- Custom 'w-divider' component, presumably used as a separator -->
    <w-divider></w-divider>

    <!-- Loop through 'tabList' again and display content based on 'activeTab' -->
    <template v-for="(tab, index) in tabList">
      <div :key="index" v-if="index + 1 === activeTab">
        <!-- Use a named slot with a dynamic name -->
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>


<script>
  export default {
    props: {
      tabList: {
        type: Array,
        required: true,
      },
      variant: {
        type: String,
        required: false,
        default: () => "vertical", // Default variant is 'vertical'
        validator: (value) => ["horizontal", "vertical"].includes(value), // Validate 'variant' prop values
      },
    },
    data() {
      return {
        activeTab: 1, // Initialize 'activeTab' data property with a default value of 1
      };
    },
  };
</script>

    
<style scoped>
  /* Create a flex container for elements with the 'flex' class */
  .flex {
    display: flex;
  }

  /* Style list items within unordered lists */
  ul > li {
    list-style-type: none; /* Remove default list bullet */
    margin-right: 20px;   /* Add right margin to list items */
    border-color: grey;   /* Set border color for list items */
  }

  /* Hide input elements */
  input {
    visibility: hidden;
  }

  /* Style labels following checked input elements */
  input:checked ~ label {
    color: red; /* Change label text color to red when input is checked */
  }
</style>
