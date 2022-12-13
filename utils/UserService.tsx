import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User as FirebaseUser,
} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { User } from "../models/User";
import { auth, db } from "./Firebase";

export function register(email: string, password: string, studentId: string) {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
        addUserToDB(user.user, studentId);
    });
}

export function getUserEmail() {
    return auth.currentUser?.email;
}

async function addUserToDB(user: FirebaseUser, studentId: string) {
    setDoc(doc(db, "users", user.email || ""), {
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
        studentId: studentId,
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

async function updateUserInDB(user: FirebaseUser) {
    updateDoc(doc(db, "users", user.email || ""), {
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

export function followUser(email: string) {
    getDoc(doc(db, "users", email)).then((resp) => {
        if (resp.exists()) {
            updateDoc(doc(db, "users", email), {
                followers: resp.data()?.followers + ";" + getUserEmail(),
            });
        }
    });
}

export async function getAllUsers() {
    const users: User[] = [];

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        users.push(doc.data() as User);
    });

    return users;
}
