<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

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
                label="E-mail address"
                type="email"
                bg-color="grey-light5"
                :validators="[validators.required]"
                v-model="email"> 
                </w-input>

                <w-input
                required
                class="mb2 spacing" 
                bg-color="grey-light5"
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
                            this.$forceUpdate();
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
/* Styling for the authentication container */
.authentication{
    height: 100vh;
}

/* Styling for card elements within the authentication section */
.w-card{
    margin-top: 13%;
    margin-bottom: 100%;
    margin-left: 30%;
    margin-right: 30%;
    transition: 0.3s;
    background-color: white;
}

/* Styling for buttons, particularly their positioning and shape */
button {
    margin-top: 20px;
    margin-left: 10px;
    border-radius: 20px;
    float: right;
}

/* Additional spacing for elements within the authentication section */
.spacing {
    margin-top: 5px;
}

/* Dark theme specific styling for cards */
.dark .w-card {
    background-color: black;
}

/* Responsive styling for smaller screens */
@media (max-width: 667px) {
    /* Adjustments to main content area in smaller screens */
    .main-content{
        margin-top: 15px;
        margin-left: 12px;
        margin-right: 12px;
        transition: 0.3s;
    }

    /* Adjustments to button styling in smaller screens */
    button {  
        float: none;
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 70%;
    }

    /* Increased spacing in smaller screens */
    .spacing {
        margin-top: 20px;
    }
}
</style>
