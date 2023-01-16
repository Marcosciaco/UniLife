import { LocationObject } from "expo-location";
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
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import showToast from "../components/Inputs/Toast";
import { Event } from "../models/Event";
import { User } from "../models/User";
import { auth, db } from "./Firebase";
import { success } from "./Theme";

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
            showToast("Account created successfully!", success);
        })
        .catch((error) => {
            showToast("Error creating account. Please try again later.", error);
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
    });
}

export function login(email: string, password: string, navigation: any): void {
    signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            updateUserInDB(user.user);
            navigation.navigate("Home");
            showToast("Logged in successfully!", success);
        })
        .catch((error) => {
            showToast("Error logging in. Please try again later.", error);
        });
}

async function updateUserInDB(user: FirebaseUser): Promise<void> {
    updateDoc(doc(db, "users", user.email || ""), {
        isOnline: true,
    });
}

export function isLoggedIn(): boolean {
    return auth.currentUser != null;
}

export function logout(navigation: any): void {
    updateDoc(doc(db, "users", getUserEmail() || ""), {
        isOnline: false,
    })
        .then(() => {
            auth.signOut();
            navigation.navigrate("Login");
        })
        .catch((error) => {
            showToast("Error logging out. Please try again later.", error);
        });
}

export function getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, "users", getUserEmail() || "")).then((resp) => {
            if (resp.exists()) {
                resolve(resp.data() as User);
            }
        });
    });
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
    getDoc(doc(db, "users", email))
        .then((resp) => {
            if (
                resp.exists() &&
                !resp.data()?.followers.split(";").includes(email)
            ) {
                updateDoc(doc(db, "users", email), {
                    followers: resp.data()?.followers + getUserEmail() + ";",
                });
            }
        })
        .catch((error) => {
            showToast("Error following user. Please try again later.", error);
        });
    getDoc(doc(db, "users", getUserEmail()))
        .then((resp) => {
            if (resp.exists()) {
                updateDoc(doc(db, "users", getUserEmail()), {
                    following: resp.data()?.following + email + ";",
                });
            }
        })
        .catch((error) => {
            showToast("Error following user. Please try again later.", error);
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
    getDoc(doc(db, "users", email))
        .then((resp) => {
            if (resp.exists()) {
                updateDoc(doc(db, "users", email), {
                    followers: resp
                        .data()
                        ?.followers.replace(getUserEmail() + ";", ""),
                });
            }
        })
        .catch((error) => {
            showToast("Error unfollowing user. Please try again later.", error);
        });
    getDoc(doc(db, "users", getUserEmail()))
        .then((resp) => {
            if (resp.exists()) {
                updateDoc(doc(db, "users", getUserEmail()), {
                    following: resp.data()?.following.replace(email + ";", ""),
                });
            }
        })
        .catch((error) => {
            showToast("Error unfollowing user. Please try again later.", error);
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
                if (event.partecipants.includes(email)) {
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
        id: "",
        name: mail,
        description: description,
        location: location,
        date: date.getTime(),
        creator: auth.currentUser?.email,
        partecipants: partecipant,
        color: color,
        inviteRead: false,
        inviteDeclined: false,
    })
        .then((resp) => {
            updateDoc(doc(db, "events", resp.id), {
                id: resp.id,
            });
            showToast("Event created successfully!", success);
        })
        .catch((error) => {
            showToast("Error creating event. Please try again later.", error);
        });
}

export function updateUserLocation(
    email: string,
    location: LocationObject
): void {
    updateDoc(doc(db, "users", email), {
        location: location,
    })
        .then(() => {})
        .catch((error) => {
            showToast("Error updating user location.", error);
        });
}

export function acceptInvite(event: Event): void {
    updateDoc(doc(db, "events", event.id), {
        inviteDeclined: false,
        inviteRead: true,
    })
        .then(() => {
            showToast("Invite accepted!", success);
        })
        .catch((error) => {
            showToast("Error accepting invite. Please try again later.", error);
        });
}

export function declineInvite(event: Event): void {
    updateDoc(doc(db, "events", event.id), {
        inviteDeclined: true,
    })
        .then(() => {
            showToast("Invite declined!", success);
        })
        .catch((error) => {
            showToast("Error declining invite. Please try again later.", error);
        });
}

export function isSelf(email: string): boolean {
    return email === getUserEmail();
}
