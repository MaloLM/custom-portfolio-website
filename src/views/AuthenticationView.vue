<template>
<div class="authentication">
    <w-card class="main-content">
        <h3>{{authTitle}}</h3>
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
                    lg
                    type="submit"
                    style="float:right;">
                    Login
                </w-button>
            </div>

        </w-form>
        <br>
        <w-alert error v-if="errorLabel">{{errorLabel}}</w-alert>
    </w-card>
   
</div>

</template>

<script setup>
    import { ref } from 'vue'
    import DatabaseService from "../services/databaseService";
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    const authTitle = "Authentication"
    const store = useStore()
    const router = useRouter()
  
    const email = ref('')
    const password = ref('')
    const errorLabel = ref(null)

    let isPassword = true
    let success = null
    let validated = 0

    if (store.getters.user == true) {
        router.push('/admin') 
    }
    

    let validators = {
        required: value => !!value || 'This field is required'
      }


    function Login(){
      try {
        login(email.value, password.value)
      }
      catch (err) {
        errorLabel.value = err.message
      }
    }

    function login(email, password){
        try {
            const authRes = DatabaseService.logIn(email, password)

            if(authRes){
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
.main-content{
    margin-top: 13%;
    margin-bottom: 100%;
    margin-left: 30%;
    margin-right: 30%;
    transition: 0.3s;
    background-color: white;
  }


.spacing {
    margin-top: 5px;
}

.dark .w-card {
background-color: black;
}
</style>