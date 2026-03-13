// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-food-delivery-app-a5799.firebaseapp.com",
  projectId: "vingo-food-delivery-app-a5799",
  storageBucket: "vingo-food-delivery-app-a5799.firebasestorage.app",
  messagingSenderId: "394125908576",
  appId: "1:394125908576:web:e76624b4d2099eb3aec105"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };