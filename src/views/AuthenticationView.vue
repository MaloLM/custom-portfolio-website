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
    class="mb2"
    label="Password"
    :validators="[validators.required]"
    :type="isPassword ? 'password' : 'text'"
    :inner-icon-left="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
    :inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
    @click:inner-icon-right="isPassword = !isPassword">
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
// import app from '../main.js'
var viewTitle = "Authentication"

var isPassword = true


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

// app.firebase.auth().createUserWithEmailAndPassword('alex@gmail.com', 'ioioioioio89')

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

  .dark .w-card {
  background-color: black;
 }
</style>