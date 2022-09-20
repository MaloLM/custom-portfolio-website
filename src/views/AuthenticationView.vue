<template>
<div class="career">
    <w-card class="main-content">
    <h1> {{ viewTitle }}</h1>
    
    <w-form
    @validate="validated++;success = error = false"
    @success="success = true"
    @error="error = true">

    <w-input
        label="E-mail adress"
        :validators="[validators.required]">
    </w-input>

    <w-input
        class="mt3"
        label="Password"
        :validators="[validators.required]">
    </w-input>

    <div class="text-right mt6">
        <w-button @click="goToHome()" type="submit">Login</w-button>
    </div>
    </w-form>
    
    </w-card>
</div>

</template>


<script setup>
import router from '../router'
var viewTitle = "Authentication"

var success = null
var error = null
var validated = 0
var validators = {
    required: value => !!value || 'This field is required'
  }

  function goToHome(){
    console.log("test")
    router.push('/admin') 
}



</script>


<style scoped>
.main-content{
    margin-top: 20%;
    margin-bottom: 100%;
    margin-left: 30%;
    margin-right: 30%;
    transition: 0.3s;
    background-color: rgba(255, 255, 255, 1);
  }
</style>