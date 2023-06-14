// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGguoaEoNaQVjKCBE1ytOq2b7xu1I9LQY",
    authDomain: "house-market-app-e374b.firebaseapp.com",
    projectId: "house-market-app-e374b",
    storageBucket: "house-market-app-e374b.appspot.com",
    messagingSenderId: "1000775669943",
    appId: "1:1000775669943:web:3c9b13d8efabe8f1fd9532"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();