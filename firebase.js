// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFK3QzzWFZyNLi7GLLGmqH99T24IUcdmQ",
  authDomain: "languagelearningapp-9d170.firebaseapp.com",
  projectId: "languagelearningapp-9d170",
  storageBucket: "languagelearningapp-9d170.firebasestorage.app",
  messagingSenderId: "160468931658",
  appId: "1:160468931658:web:09b2bfaa84d3af063242b3",
  measurementId: "G-HFQT6FVZGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);