import firebase from 'firebase/compat/app';
import "firebase/compat/database";
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

//  Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: "xxx" , // process.env.VUE_APP_MESSAGING_SENDER_ID
    appId: process.env.VUE_APP_APP_ID,
}; 

const app = firebase.initializeApp(firebaseConfig);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.VUE_APP_RECAPTCHA_V3_PUBLIC_KEY),
    isTokenAutoRefreshEnabled: true
  });

export default firebase;