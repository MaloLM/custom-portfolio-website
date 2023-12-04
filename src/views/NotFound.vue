<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <!-- Main content container for the 404 page -->
    <div class="main-content">
      <!-- Title displaying the error code -->
      <h1 class="title">404</h1>
      <!-- Error message indicating the page is not found -->
      <p class="message">OOPS! You have found the uncharted page.</p>
      
      <!-- Image to visually represent the error -->
      <img src="../assets/not_found.gif">
  
      <!-- Link to navigate back to the homepage -->
      <router-link to="/" class="link">
        <button> Go home</button>
      </router-link> 
    </div>
  </template>
  
  <style scoped>
    /* Styling for the main content of the 404 page */
    .main-content {
        margin-left: 70px;
        margin-right: 70px;
        display: flex; 
        flex-direction: column;
        align-items: center;
        height: 100vh;
    }
  
    /* Styling for the error code */
    h1 {
        font-size: 100px;
    }
  
    /* Styling for the error message */
    p {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        margin: 10px;
    }
  
    /* Styling for the button */
    button {
        margin-top: 20px;
        border-radius: 20px;
    }
  
    /* Styling for the error image */
    img {
        border-style: solid;
    }
  </style>
  