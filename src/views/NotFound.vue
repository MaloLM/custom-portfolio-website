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
    font-weight: bold;
    font-size: 20px;
    margin: 10px;
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

img {
    border-style: solid;
}
</style>