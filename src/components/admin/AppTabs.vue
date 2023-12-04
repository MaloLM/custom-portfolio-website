<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <div
      :class="{
        flex: variant === 'horizontal',
      }"
    >
      <ul
        :class="{
          flex: variant === 'vertical',
        }"
      >
        <li v-for="(tab, index) in tabList" :key="index">
          <label :for="`${index}`" v-text="tab" />
          <input
            :id="`${index}`"
            type="radio"
            :name="`tab`"
            :value="index + 1"
            v-model="activeTab"
          />
        </li>
      </ul>
      
      <w-divider></w-divider>

      <template v-for="(tab, index) in tabList">
        <div :key="index" v-if="index + 1 === activeTab">
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
          default: () => "vertical",
          validator: (value) => ["horizontal", "vertical"].includes(value),
        },
      },
      data() {
        return {
          activeTab: 1,
        };
      },
    };
    </script>
    
    <style scoped>
    .flex {
      display: flex;
    }

    ul > li {
        list-style-type: none;
        margin-right: 20px;
        border-color: grey;
    }

    input {
      visibility:hidden;
    }

    input:checked ~ label {
      color: red;
    }
    </style>