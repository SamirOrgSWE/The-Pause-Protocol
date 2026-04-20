// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


//project config w firebase
const firebaseConfig = {
  apiKey: "AIzaSyCujlnfKGsrfDQDnWz2g83yldV5cNUujfk",
  authDomain: "pause-protocol.firebaseapp.com",
  projectId: "pause-protocol",
  storageBucket: "pause-protocol.firebasestorage.app",
  messagingSenderId: "391073787479",
  appId: "1:391073787479:web:ceaee79453f172fd5dbd12",
  measurementId: "G-2E0RDFE0J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
