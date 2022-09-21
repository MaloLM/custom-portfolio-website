import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

// import firebase from 'firebase/app';
// import {} from 'firebase/auth' ;
// import firebase from "firebase";
// import { initializeApp } from 'firebase/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//  Your web app's Firebase configuration

//  const firebaseConfig = {
//    apiKey: "AIzaSyBONiZm2L04Qzqq1XyvaWpaUYrzIaR6UgE",
//    authDomain: "my-portefolio-1390c.firebaseapp.com",
//    projectId: "my-portefolio-1390c",
//    storageBucket: "my-portefolio-1390c.appspot.com",
//    messagingSenderId: "741595692754",
//    appId: "1:741595692754:web:32e209c44d3af17560f70b"
//  };

// const FirebaseApp = initializeApp(firebaseConfig);

const app = createApp(App).use(store).use(router) //.use(firebase)

new WaveUI(app, {
    // Some Wave UI options.
  })

app.mount('#app')

