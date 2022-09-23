<template>
<div class="authentication">
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
        class="mb2 spacing"
        label="Password"
        :validators="[validators.required]"
        :type="isPassword ? 'password' : 'text'"
        v-model="password">
        </w-input>
        <br>
        <div class="text-right mt6">
            <w-button
                type="submit"
                style="float:right;">
                Login
            </w-button>
        </div>
    </w-form>
    <br>
    <w-alert error v-if="errorLabel">{{errorLabel}}</w-alert>
</div>

</template>

<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import firebase from 'firebase/compat/app'
    import 'firebase/compat/auth'
    import { useRouter } from 'vue-router'

    const store = useStore()
    const router = useRouter()
  
    const email = ref('')
    const password = ref('')
    const errorLabel = ref(null)

    var isPassword = true
    var success = null
    var validated = 0

    if (store.getters.user == true) {
        router.push('/admin') 
    }
    
    var validators = {
        required: value => !!value || 'This field is required'
      }


    function Login(){
      try {
        logIn(email.value, password.value)
      }
      catch (err) {
        errorLabel.value = err.message
      }
    }

    async function logIn( email, password ){
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            if (response) {
                store.commit('SET_LOGGED_IN', true)
                router.push('/admin')    
            }
        } catch (err) {
            errorLabel.value = err.message
            console.log(errorLabel.value)
        }
  }

</script>
    

<style scoped>
.spacing {
    margin-top: 5px;
}

.dark .w-card {
background-color: black;
}
</style>