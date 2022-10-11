<template>
    <div class="authentication">
        <w-card class="main-content">
            
            <h3>{{title}}</h3>

            <w-form 
                action="#" 
                v-model="valid"
                @validate="validated++;success = error = false"
                @success="success = true"
                @error="error = true"
                @submit.prevent="loginProcess">
            
                <w-input
                    class="spacing"
                    required
                    label="E-mail adress"
                    type="email"
                    :validators="[validators.required]"
                    v-model="email"> 
                </w-input>

                <w-input
                required
                class="mb2 spacing" 
                label="Password"
                type='password' 
                v-model="password"
                :validators="[validators.required]">
                </w-input>

                <div>
                    <w-alert
                    error 
                    v-if="errorLabel"
                    style="float:left">{{errorLabel}}
                    </w-alert>
                    
                    <button class="spacing"
                    :disabled="valid === false"
                    type="submit">
                    Login
                    </button>
                </div>
            </w-form>
        </w-card>
    </div>
</template>


<script>
import databaseService from '../services/databaseService';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: "authentication-view",
    data() {
        return {
            title: 'Authentication',
            store: useStore(),
            router: useRouter(),
            email: null,
            password: null,
            errorLabel: null,
            isPassword: true,
            success: null,
            validated: 0,
            valid:null,
            validators: {
                required: value => !!value || 'This field is required'
            },
        };
    },
    methods: {
        loginProcess(){
            this.login(this.email, this.password)
        },
        async login(email, password){
            try {
                if(email != null && password != null){
                    if(this.isEmailValid(this.email)){
                        const authRes = await databaseService.logIn(email, password)
                        if(authRes == true){
                            this.router.push('/admin')
                        }
                        else {
                            let errorMessage = authRes
                            errorMessage = errorMessage.substring(
                                errorMessage.indexOf(":") + 1, 
                                errorMessage.lastIndexOf("(")
                            );
                            this.errorLabel = errorMessage
                        }
                    }
                    else{
                        this.errorLabel = 'E-mail format is invalid, please correct it to login'
                    }
                }
            }
            catch (err) {
                let errorMessage = err.message
                errorMessage = errorMessage.substring(
                    errorMessage.indexOf(":") + 1, 
                    errorMessage.lastIndexOf("(")
                );
                this.errorLabel = errorMessage
            } 
        },
        isEmailValid(email) {
            const emailRegexp = new RegExp(
            /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
            )
            return emailRegexp.test(email)
        },
    },
    mounted() {
        if (databaseService.isUserAuthenticated()) {
            this.router.push('/admin')
        }
    }
};
</script>


<style scoped>
.authentication{
    height: 100vh;
}

.w-card{
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
    float:right;
}

.spacing {
    margin-top: 5px;
}

.dark .w-card {
    background-color: black;
}

@media (max-width: 667px) {
    .main-content{
        margin-top: 15px;
        margin-left: 12px;
        margin-right: 12px;
        transition: 0.3s;
    }

    button {  
        float: none;
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 70%;
    }

    .spacing {
        margin-top: 20px;
    }
}

</style>