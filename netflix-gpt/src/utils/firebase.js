// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf2WwSYXAiXclYx3xp8YqF9jZfvQCEjqc",
  authDomain: "netflixgpt-c8607.firebaseapp.com",
  projectId: "netflixgpt-c8607",
  storageBucket: "netflixgpt-c8607.appspot.com",
  messagingSenderId: "119596803354",
  appId: "1:119596803354:web:8a2644154e4549c79bf8a3",
  measurementId: "G-6BTLTB2TLY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// calling auth - we can call it individually in components aslo
export const auth = getAuth();
