// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY9cm42o6nC1MkadQF6FrDkFWIV0Zlh9Q",
  authDomain: "hafizh-pcweb6-firebase.firebaseapp.com",
  projectId: "hafizh-pcweb6-firebase",
  storageBucket: "hafizh-pcweb6-firebase.appspot.com",
  messagingSenderId: "219135971932",
  appId: "1:219135971932:web:ec59db612eadf9e7c3cc99"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);