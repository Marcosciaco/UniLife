import { LocationObject } from "expo-location";
import { UserInfo } from "firebase/auth";

export type User = {
    uid: string;
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    phoneNumber: string | null;
    photoURL: string | null;
    providerData: UserInfo[];
    providerId: string;
    refreshToken: string;
    tenantId: string | null;
    studentId: string;
    followers: string;
    following: string;
    isOnline: boolean;
    locationTracking: boolean;
    location: LocationObject;
};
