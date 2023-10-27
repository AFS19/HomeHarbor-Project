// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "home-harbor-526ff.firebaseapp.com",
  projectId: "home-harbor-526ff",
  storageBucket: "home-harbor-526ff.appspot.com",
  messagingSenderId: "683074853332",
  appId: "1:683074853332:web:2b9970e2e9e151ed645e41",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
