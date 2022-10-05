<template>
<div class="authentication">
    <w-card class="main-content">
        
        <h3>{{authTitle}}</h3>

        <w-form 
        action="#" 
        v-model="valid"
        @validate="validated++;success = error = false"
        @success="success = true"
        @error="error = true"
        @submit.prevent="Login">
        
            <w-input
                label="E-mail adress"
                type="email"
                :validators="[validators.required]"
                v-model="email"> 
            </w-input>

            <w-input
            required
            class="mb2 spacing"
            label="Password"
            :validators="[validators.required]"
            :type="isPassword ? 'password' : 'text'"
            v-model="password">
            </w-input>


            <div>
                <button
                    :disabled="valid === false"
                    type="submit"
                    style="float:right;">
                    Login
                </button>
            </div>

        </w-form>
        <br>
        <br>
        <br>
        <w-alert error v-if="errorLabel">{{errorLabel}}</w-alert>
    </w-card>
   
</div>

</template>

<script setup>
    import { ref } from 'vue'
    import DatabaseService from '../services/databaseService';
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    const authTitle = 'Authentication'
    const store = useStore()
    const router = useRouter()
  
    const email = ref(null)
    const password = ref(null)
    const errorLabel = ref(null)

    let isPassword = true
    let success = null
    let validated = 0


    if (store.getters.status) {
        router.push('/admin') 
    }
    
    let valid = null;


    let validators = {
        required: value => !!value || 'This field is required'
      }


    function isEmailValid(email) {
        const emailRegexp = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
        )
        return emailRegexp.test(email)
    }

    function Login(){
        if(isEmailValid(email.value)){
            login(email.value, password.value)
        }
        else{
            errorLabel.value = "E-mail format is invalid, please correct it to login"
            console.log(errorLabel.value)
        }
    }

    async function login(email, password){
        try {
            if(email != null && password != null){
                const authRes = await DatabaseService.logIn(email, password)

                if(authRes == true){
                    store.commit('SET_LOGGED_IN', true)
                    router.push('/admin')
                }
                else {
                    let errorMessage = authRes

                    errorMessage = errorMessage.substring(
                        errorMessage.indexOf(":") + 1, 
                        errorMessage.lastIndexOf("(")
                    );

                    errorLabel.value = errorMessage
                }
            }
        }
        catch (err) {
            let errorMessage = err.message
            
            errorMessage = errorMessage.substring(
                errorMessage.indexOf(":") + 1, 
                errorMessage.lastIndexOf("(")
            );
            
            errorLabel.value = errorMessage
        } 
    }

</script>


    

<style scoped>
.authentication{
    height: 100vh;
}

.main-content{
    margin-top: 13%;
    margin-bottom: 100%;
    margin-left: 30%;
    margin-right: 30%;
    transition: 0.3s;
    background-color: white;
  }

button {
    background-color: #2d467d;
    border: 0;
    padding: 10px 40px;
    margin-top: 20px;
    margin-left: 10px;
    color: white;
    border-radius: 20px;
    font-size:13px;
}


.spacing {
    margin-top: 5px;
}

.dark .w-card {
background-color: black;
}
</style>