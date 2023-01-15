import { Room } from "./Room";
import { Slot } from "./Slot";
import { User } from "./User";

export type RoomReservation = {
    user: User;
    room: Room;
    slot: Slot;
};
