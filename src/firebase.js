import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeRN6449Bt5VlZZCMkRS5Xp9IqEWb6u8w",
  authDomain: "mi-revista-ff922.firebaseapp.com",
  projectId: "mi-revista-ff922",
  storageBucket: "mi-revista-ff922.appspot.com", // ojo, corregí aquí también
  messagingSenderId: "590842507681",
  appId: "1:590842507681:web:7c63352e9f338ef63b9be0",
  measurementId: "G-RFPJX411L5"
};

const app = initializeApp(firebaseConfig); // debe ser minúscula 'app'

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }; // exportación nombrada
