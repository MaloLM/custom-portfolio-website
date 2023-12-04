<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <!-- Toggle switch container with click event -->
    <div @click="toggleTheme" class="switch">
        <!-- Flicker element for visual effect -->
        <div class="flicker"></div>
        <!-- Moon icon for indicating dark theme -->
        <div class="moon"></div>
    </div>
</template>

<script setup>
    // Import Vuex store functionality
    import { useStore } from 'vuex'
    // Access the Vuex store
    const store = useStore()

    // Toggle the initial body class to 'light'
    document.body.classList.toggle('light')

    // Function to toggle between light and dark themes
    function toggleTheme(){
        // Toggle the dark theme in Vuex store
        store.commit('SET_DARK_THEME', !(store.getters.theme.isDark))
        // Toggle 'light' and 'dark' classes on the body
        document.body.classList.toggle('light')
        document.body.classList.toggle('dark')
    }
</script>

<style scoped>
/* Styles for the toggle switch and its components */

/* Main switch container */
.switch {
    width: 60px;
    height: 30px;
    border-radius: 15px;
    background-color: rgb(10, 10, 10);
    position: relative;
}

/* Hover effect on the switch */
.switch:hover {
    cursor: pointer;
}

/* Flicker element for animation */
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

/* Moon icon for indicating dark theme */
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

/* Animation for the flicker element when in dark theme */
.dark .flicker {
    transform: translateX(30px);
}
</style>
