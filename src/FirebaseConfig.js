// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuaELMwCY9Yxybyo5vAnQ3MO0BEC5a2Ps",
    authDomain: "dentalopd-ef97b.firebaseapp.com",
    projectId: "dentalopd-ef97b",
    storageBucket: "dentalopd-ef97b.appspot.com",
    messagingSenderId: "532231520228",
    appId: "1:532231520228:web:66d13cc62b119096b691f1",
    measurementId: "G-0G41CJFP36"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };