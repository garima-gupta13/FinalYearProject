//  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyDfLLkS1kSlC60XM8RVf_R8qAwu6kCorNg",
    authDomain: "garima-bloggingwebsite.firebaseapp.com",
    projectId: "garima-bloggingwebsite",
    storageBucket: "garima-bloggingwebsite.appspot.com",
    messagingSenderId: "939926395526",
    appId: "1:939926395526:web:ba3ab0317c44a087870f07",
    measurementId: "G-M3TE6VE3GQ"
 });
// const firebaseConfig = {
//     apiKey: "AIzaSyDfLLkS1kSlC60XM8RVf_R8qAwu6kCorNg",
//     authDomain: "garima-bloggingwebsite.firebaseapp.com",
//     projectId: "garima-bloggingwebsite",
//     storageBucket: "garima-bloggingwebsite.appspot.com",
//     messagingSenderId: "939926395526",
//     appId: "1:939926395526:web:ba3ab0317c44a087870f07",
//     measurementId: "G-M3TE6VE3GQ"
//   };

  // Initialize Firebase
//    const app = initializeApp(firebaseConfig);
//    const analytics = getAnalytics(app);
// firebase.initializeApp(firebaseConfig);
// var rootRef=firebase.database().ref();
// let db = firebase.firestore();

//initialize firebase
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
