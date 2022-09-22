<template>
<div class="career">
    <w-card class="main-content">
    <h1> {{ viewTitle }}</h1>
    
    <div v-if="error" class="alert alert-danger">{{error}}</div>

    <w-form action="#"
    @validate="validated++;success = error = false"
    @success="success = true"
    @error="error = true"
    @submit.prevent="Login">
    

    <w-input
        label="E-mail adress"
        :validators="[validators.required]"
        v-model="email">
        
    </w-input>

    <w-input
    class="mb2"
    label="Password"
    :validators="[validators.required]"
    :type="isPassword ? 'password' : 'text'"
    :inner-icon-left="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
    @click:inner-icon-right="isPassword = !isPassword"
    v-model="password">
    </w-input>

    <div class="text-right mt6">
        <w-button type="submit">Login</w-button>
    </div>
    </w-form>

    </w-card>
</div>

</template>

<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import firebase from 'firebase/compat/app'
    import 'firebase/compat/auth'
    import { useRouter } from 'vue-router'

  
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    var viewTitle = "Authentication"
    var isPassword = true
    var success = null
    var validated = 0

    const store = useStore()
    const router = useRouter()
    
    var validators = {
        required: value => !!value || 'This field is required'
      }

    function Login(){
      try {
        logIn(email.value, password.value)
        // store.dispatch('logIn', {
        //     email: email.value,
        //     password: password.value
        // })
      }
      catch (err) {
        error.value = err.message
      }
    }

    async function logIn( email, password ){
      const response = await firebase.auth().signInWithEmailAndPassword(email, password)
      if (response) {
        store.commit('SET_LOGGED_IN', true)
        router.push('/admin') 
        
      } else {
          console.log('login failed')
          router.push('/')
      }
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

  .dark .w-card {
  background-color: black;
 }
</style>