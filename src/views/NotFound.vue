<template>

    <div class="main-content">
        <h1 class="NotFoundTitle">404</h1>
        <p class="NotFoundMessage"> OOPS ! You have found the uncharted page. </p>
        

        <img src="../assets/not_found.gif">

        <router-link to="/" class="link">
            <button class="GoHomeButton"> Go home</button>
        </router-link> 


    </div>

</template>


<script>

</script>


<style scoped>
.main-content{
    margin-top: 0%;
    margin-bottom: 100%;
    margin-left: 70px;
    margin-right: 70px;
    transition: 0.3s;
    /* text-align: center; */
    display: flex; 
    flex-direction: column;
    align-items: center;
  }

.NotFoundMessage {
font-weight: bold;
font-size: 20px;
margin: 10px;
}

.NotFoundTitle {
font-size: 100px;
}

.GoHomeButton {
    background-color: #2d467d;
    border: 0;
    padding: 10px 40px;
    margin-top: 20px;
    margin-left: 10px;
    /* margin-left: 10px; */
    color: white;
    border-radius: 20px;
    font-size:13px;
}
</style>