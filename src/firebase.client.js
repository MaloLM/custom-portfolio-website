// Copyright (c) [2023] [Malo Le Mestre]
// This software is released under the Apache 2.0 License
// https://www.apache.org/licenses/LICENSE-2.0.html


// Import firebase modules and app-check for security
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Define Firebase configuration using environment variables
let firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: "xxx",
    appId: process.env.VUE_APP_APP_ID,
}; 

// Initialize Firebase app with the config
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase App Check with ReCaptcha V3
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.VUE_APP_RECAPTCHA_V3_PUBLIC_KEY),
  isTokenAutoRefreshEnabled: true
});

// Export the configured firebase instance
export default firebase;
