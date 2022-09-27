import firebase from 'firebase/app';
import "firebase/database";

//  Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: "xxx" , // process.env.VUE_APP_MESSAGING_SENDER_ID
    appId: "xxx", // process.env.VUE_APP_APP_ID,
}; 
console.log(firebaseConfig)

firebase.initializeApp(firebaseConfig);

export default firebase;