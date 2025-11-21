// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAMrtdQQbtJ2ZlapjnYeGuAjFFrhvIrTM4",
  authDomain: "aitripplanner-422f4.firebaseapp.com",
  projectId: "aitripplanner-422f4",
  storageBucket: "aitripplanner-422f4.firebasestorage.app",
  messagingSenderId: "77858709910",
  appId: "1:77858709910:web:d46a145483f64817743db7",
  measurementId: "G-8LNLYVLH1C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
