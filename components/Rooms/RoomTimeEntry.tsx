import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import GroupIcon from "../../assets/icons/group";
import ReserveIcon from "../../assets/icons/reserve";
import { Room } from "../../models/Room";
import { RoomReservation } from "../../models/RoomReservation";
import { Slot } from "../../models/Slot";
import {
    getReservationsforSlot,
    removeReservation,
    reserveRoom,
} from "../../utils/RoomUtil";
import {
    dark,
    error,
    light,
    secondary,
    success,
    white,
} from "../../utils/Theme";
import { getCurrentUser, isSelf } from "../../utils/UserService";
import showToast from "../Inputs/Toast";
import ReserveSlotButton from "./ReserveRoomButton";

function getHour(start: string): string {
    const date = new Date(start);
    const minutes = String(date.getMinutes()).padStart(2, "0").padEnd(2, "0");
    return `${date.getHours()}:${minutes}`;
}

export default function RoomTimeEntry({
    slot,
    room,
    free,
}: {
    slot: Slot;
    room: Room;
    free: boolean;
}) {
    const [reservation, setReservation] = useState<RoomReservation>();

    const getReservations = () =>
        getReservationsforSlot(slot).then((res: RoomReservation | null) => {
            if (res) {
                setReservation(res);
            }
        });

    useEffect(() => {
        getReservations();
    }, [reservation]);

    const isNow = (slot: Slot): boolean => {
        const now = new Date();
        const start = new Date(slot.start);
        const end = new Date(slot.end);
        return now >= start && now <= end;
    };

    return (
        <View>
            <View
                style={[
                    styles.timeSlot,
                    {
                        borderWidth: isNow(slot) ? 2 : 0,
                        borderColor: isNow(slot) ? secondary : white,
                    },
                ]}
            >
                <View style={styles.time}>
                    <Text style={styles.text}>
                        {slot.start === "0" ? "Opening" : getHour(slot.start)}
                    </Text>
                    <Text style={styles.text}>-</Text>
                    <Text style={styles.text}>
                        {slot.end === "9" ? "Closing" : getHour(slot.end)}
                    </Text>
                </View>
                <Text style={styles.slotDescription}>
                    {free
                        ? `Available from ${
                              slot.start === "0"
                                  ? "Opening"
                                  : getHour(slot.start)
                          } to ${
                              slot.end === "9" ? "Closing" : getHour(slot.end)
                          }`
                        : slot.description}
                </Text>
                {reservation != null || (reservation == null && !free) ? (
                    <Pressable
                        style={[
                            styles.reserveButton,
                            {
                                backgroundColor: secondary,
                            },
                        ]}
                        onPress={() => {
                            if (isSelf(reservation?.user.email || "")) {
                                removeReservation(reservation);
                                setReservation(undefined);
                                showToast(
                                    "Reservation removed successfully",
                                    success
                                );
                            } else {
                                showToast(
                                    "This room is already reserved",
                                    error
                                );
                                return;
                            }
                        }}
                    >
                        {reservation ? (
                            <Image
                                source={{
                                    uri:
                                        reservation.user.photoURL ||
                                        "../../assets/images/user_placeholder.png",
                                }}
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 10,
                                }}
                            />
                        ) : (
                            <GroupIcon height={20} width={20} color={dark} />
                        )}
                    </Pressable>
                ) : (
                    <ReserveSlotButton
                        free={free}
                        room={room}
                        slot={slot}
                        onReserved={() => getReservations()}
                    />
                )}
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    content: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    timeSlot: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: white,
    },
    slotDescription: {
        color: dark,
        flex: 1,
        marginLeft: 10,
        fontFamily: "Poppins_500Medium",
    },
    time: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: dark,
        width: 70,
    },
    text: {
        color: dark,
        fontFamily: "Poppins_400Regular",
    },
    reserveButton: {
        position: "absolute",
        right: 5,
        top: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 30,
        width: 30,
        color: white,
    },
});
