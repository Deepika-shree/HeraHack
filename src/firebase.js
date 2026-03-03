import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn7LLpcyi4Asuf9-WUhZwErAHbht_T4DY",
  authDomain: "she-returns-d5d24.firebaseapp.com",
  projectId: "she-returns-d5d24",
  storageBucket: "she-returns-d5d24.firebasestorage.app",
  messagingSenderId: "274488709744",
  appId: "1:274488709744:web:2d811382d6d4b040d21ab5"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();  // ← add this line
