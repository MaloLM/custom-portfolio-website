<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <div class="main-content">
        <h1 class="title">404</h1>
        <p class="message"> OOPS ! You have found the uncharted page. </p>
        
        <img src="../assets/not_found.gif">

        <router-link to="/" class="link">
            <button> Go home</button>
        </router-link> 
    </div>
</template>

<style scoped>
.main-content {
    margin-left: 70px;
    margin-right: 70px;

    display: flex; 
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

h1 {
    font-size: 100px;
}

p {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin: 10px;
}

button {
    margin-top: 20px;
    border-radius: 20px;
}

img {
    border-style: solid;
}
</style>