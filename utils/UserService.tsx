import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    User as FirebaseUser,
} from "firebase/auth";
import {
    addDoc,
    collection,
    doc,
    Firestore,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { User } from "../models/User";
import { auth, db } from "./Firebase";
import { Event } from "../models/Event";

export function register(
    email: string,
    password: string,
    studentId: string,
    navigation: any,
    displayName: string
): void {
    createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
            if (auth.currentUser) {
                updateProfile(auth.currentUser, {
                    displayName: displayName,
                });
            }
            addUserToDB(user.user, studentId, displayName);
            navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getUserEmail(): string {
    return auth.currentUser?.email || "";
}

async function addUserToDB(
    user: FirebaseUser,
    studentId: string,
    displayName: string
): Promise<void> {
    setDoc(doc(db, "users", user.email || ""), {
        uid: user.uid,
        displayName: displayName,
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
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export function login(email: string, password: string, navigation: any): void {
    signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            updateUserInDB(user.user);
            navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        });
}

async function updateUserInDB(user: FirebaseUser): Promise<void> {
    updateDoc(doc(db, "users", user.email || ""), {
        isOnline: true,
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export function isLoggedIn(): boolean {
    return auth.currentUser != null;
}

export function logout(navigation: any): void {
    updateDoc(doc(db, "users", getUserEmail() || ""), {
        isOnline: false,
    }).then(() => {
        auth.signOut();
        navigation.navigrate("Login");
    });
}

export function getCurrentUser() {
    return getDoc(doc(db, "users", getUserEmail() || ""));
}

export async function getAllUsers(): Promise<User[]> {
    const users: User[] = [];

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        users.push(doc.data() as User);
    });

    return users;
}

export function followUser(email: string): void {
    getDoc(doc(db, "users", email)).then((resp) => {
        if (resp.exists()) {
            updateDoc(doc(db, "users", email), {
                followers: resp.data()?.followers + getUserEmail() + ";",
            });
        }
    });
    getDoc(doc(db, "users", getUserEmail())).then((resp) => {
        if (resp.exists()) {
            updateDoc(doc(db, "users", getUserEmail()), {
                following: resp.data()?.following + email + ";",
            });
        }
    });
}

export function getFollowers(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, "users", getUserEmail())).then((resp) => {
            if (resp.exists()) {
                resolve(resp.data()?.followers.split(";"));
            }
        });
    });
}

export function getFollowing(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, "users", getUserEmail())).then((resp) => {
            if (resp.exists()) {
                resolve(resp.data()?.following.split(";"));
            }
        });
    });
}

export function unfollowUser(email: string): void {
    getDoc(doc(db, "users", email)).then((resp) => {
        if (resp.exists()) {
            updateDoc(doc(db, "users", email), {
                followers: resp
                    .data()
                    ?.followers.replace(getUserEmail() + ";", ""),
            });
        }
    });
    getDoc(doc(db, "users", getUserEmail())).then((resp) => {
        if (resp.exists()) {
            updateDoc(doc(db, "users", getUserEmail()), {
                following: resp.data()?.following.replace(email + ";", ""),
            });
        }
    });
}

export function getFollowersOfUser(email: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, "users", email)).then((resp) => {
            if (resp.exists()) {
                resolve(resp.data()?.followers.split(";"));
            }
        });
    });
}

export function getUsernameByEmail(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, "users", email)).then((resp) => {
            if (resp.exists()) {
                resolve(resp.data()?.displayName);
            }
        });
    });
}

export function getProfileEvents(email: string): Promise<Event[]> {
    return new Promise((resolve, reject) => {
        const events: Event[] = [];
        getDocs(query(collection(db, "events"))).then((resp) => {
            resp.forEach((doc) => {
                const event = doc.data() as Event;
                if (event.creator === email) {
                    events.push(event);
                }
            });
            resolve(events);
        });
    });
}

export function createEvent(
    mail: string,
    description: string,
    location: string,
    date: Date,
    partecipant: string[],
    color: string
): void {
    addDoc(collection(db, "events"), {
        id: Math.random().toString(36).substring(7),
        name: mail,
        description: description,
        location: location,
        date: date.getTime(),
        creator: auth.currentUser?.email,
        partecipants: partecipant,
        color,
    });
}
