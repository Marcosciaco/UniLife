import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAVor0z0KCw03CtW9GtVfUP4W1I9O0VVI8",
    authDomain: "unibzlife.firebaseapp.com",
    projectId: "unibzlife",
    storageBucket: "unibzlife.appspot.com",
    messagingSenderId: "799059771686",
    appId: "1:799059771686:web:6ac4e1619d80a6de3cc1e7",
    measurementId: "G-ZP2TFMXSSE",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
