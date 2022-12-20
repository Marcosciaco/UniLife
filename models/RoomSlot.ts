import { Room } from "./Room";
import { Slot } from "./Slot";

export type RoomSlot = {
    room: Room;
    reservedSlots: Slot[];
    freeSlots: Slot[];
};
