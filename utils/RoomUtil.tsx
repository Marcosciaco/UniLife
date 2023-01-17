import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
} from "firebase/firestore";
import { Room } from "../models/Room";
import { RoomReservation } from "../models/RoomReservation";
import { Slot } from "../models/Slot";
import { User } from "../models/User";
import { db } from "./Firebase";

export function reserveRoom(room: Room, slot: Slot, user: User) {
    return new Promise<void>((resolve, reject) => {
        const reservation: RoomReservation = {
            room: room,
            user: user,
            slot: slot,
        };
        getReservationsforSlot(slot)
            .then((resp) => {
                if (resp === null) {
                    setReservation(reservation)
                        .then(() => {
                            resolve();
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else {
                    reject("Room already reserved for that slot");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function setReservation(reservation: RoomReservation): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setDoc(
            doc(
                db,
                "reservations",
                reservation.room.name +
                    ";" +
                    reservation.slot.start +
                    ";" +
                    reservation.slot.end
            ),
            reservation
        )
            .then(() => {
                resolve();
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

export function getReservationsforSlot(
    slot: Slot
): Promise<RoomReservation | null> {
    return new Promise((resolve, reject) => {
        getDocs(collection(db, "reservations")).then((resp) => {
            resp.forEach((doc) => {
                if (
                    doc.data().slot.start === slot.start &&
                    doc.data().slot.end === slot.end
                ) {
                    resolve(doc.data() as RoomReservation);
                }
            });
            resolve(null);
        });
    });
}

export function removeReservation(
    reservation: RoomReservation | undefined
): void {
    if (reservation === undefined) return;
    deleteDoc(
        doc(
            db,
            "reservations",
            reservation.room.name +
                ";" +
                reservation.slot.start +
                ";" +
                reservation.slot.end
        )
    );
}
