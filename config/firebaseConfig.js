// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "my-project-31f23.firebaseapp.com",
  projectId: "my-project-31f23",
  storageBucket: "my-project-31f23.firebasestorage.app",
  messagingSenderId: "772517011155",
  appId: "1:772517011155:web:e0d8314a63159c06543e26",
  measurementId: "G-TM8JFP490E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);