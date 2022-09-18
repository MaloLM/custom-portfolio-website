<template>
    <div @click="onclick" class="switch">
        <div class="flicker"></div>
        <div class="moon"></div>
    </div>
</template>


<script setup>
    // var isDark = false
    document.body.classList.toggle('light')
    function onclick(){
        // isDark = (isDark == true) ? false : true;
        document.body.classList.toggle('light')
        document.body.classList.toggle('dark')
        // if(isDark == true){
        //     document.body.classList.toggle('light')
        //     document.body.classList.toggle('dark')
        // } else {
        //     document.body.classList.toggle('dark')
        // }
    }

</script>

<style scoped>
    .switch {
    width: 60px;
    height: 30px;
    border-radius: 15px;
    background-color: rgb(39, 38, 38);
    position: relative;
    }

    .flicker {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 5px;
    left: 4px;
    
    z-index: 1;
    box-shadow:
        inset 2px 2px 2px rgb(255,255,255),
        inset -2px -2px 2px rgb(195 193 198 / 90%);
    transition: 0.3s;
    }

    .moon {
    width: 15px;
    height: 15px;
    border-radius: 7px;
    box-shadow: 3px 3px 0 0 rgb(255, 255, 255);
    position: absolute;
    top: 5px;
    left: 33px;
    z-index: 0;
    }

    .dark .flicker {
        transform: translateX(30px);
    }
</style>