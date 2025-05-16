// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmjGWAksilEhBksBpiZMV7WL6oCU-2ML0",
  authDomain: "resortbackend-bb920.firebaseapp.com",
  projectId: "resortbackend-bb920",
  storageBucket: "resortbackend-bb920.firebasestorage.app",
  messagingSenderId: "508003736604",
  appId: "1:508003736604:web:6e86cff8e8252aec9bd3d9",
  measurementId: "G-H31NNWJPDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Analytics - only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };