import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";

export function register(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
        addUserToDB(user.user);
    });
}

export function getUserEmail() {
    return auth.currentUser?.email;
}

async function addUserToDB(user: any) {
    setDoc(doc(db, "users", user.email), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerData: user.providerData,
        providerId: user.providerId,
        refreshToken: user.refreshToken,
        tenantId: user.tenantId,
        followers: "",
        isOnline: true,
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef);
    });
}

export function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
        updateUserInDB(user.user);
    });
}

async function updateUserInDB(user: any) {
    updateDoc(doc(db, "users", user.email), {
        isOnline: true,
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef);
    });
}

export function isLoggedIn() {
    return auth.currentUser != null;
}

export function logout() {
    updateDoc(doc(db, "users", getUserEmail() || ""), {
        isOnline: false,
    }).then(() => {
        auth.signOut();
    });
}

export function getCurrentUser() {
    return getDoc(doc(db, "users", getUserEmail() || ""));
}
