import { RoomSlot } from "../models/RoomSlot";
import { Text, View, StyleSheet, Pressable } from "react-native";
import React from "react";
import Animated, { FadeInLeft } from "react-native-reanimated";

export default function RoomListEntry({
    room,
    delay,
}: {
    room: RoomSlot;
    delay: number;
}) {
    const [available, setAvailable] = React.useState(false);
    const [actual, setActual] = React.useState(room.freeSlots[0]);

    React.useEffect(() => {
        const now = new Date();

        const freeSlots = room.freeSlots.filter((slot) => {
            const start = new Date(slot.start);
            const end = new Date(slot.end);
            return start <= now && end >= now;
        });

        const reservedSlots = room.reservedSlots.filter((slot) => {
            const start = new Date(slot.start);
            const end = new Date(slot.end);
            return start <= now && end >= now;
        });

        if (freeSlots.length > 0) {
            setActual(freeSlots[0]);
        } else if (reservedSlots.length > 0) {
            setActual(reservedSlots[0]);
        }

        setAvailable(freeSlots.length > 0);
    }, []);

    return (
        <Animated.View entering={FadeInLeft.delay(delay)} style={styles.row}>
            <Pressable style={styles.rowContainer}>
                <View style={styles.slotRoom}>
                    <Text>
                        {room.room.campus} {room.room.building}
                        {room.room.name}
                    </Text>
                </View>
                <View style={styles.slotTime}>
                    <Text>
                        {getHour(actual.start) === "1:00"
                            ? "Opening"
                            : getHour(actual.start)}
                        -
                        {getHour(actual.end) === "1:00"
                            ? "Closing"
                            : getHour(actual.end)}
                    </Text>
                </View>
                {available ? (
                    <View style={styles.available}></View>
                ) : (
                    <View style={styles.notAvailable}></View>
                )}
            </Pressable>
        </Animated.View>
    );
}

function getHour(date: string) {
    const d = new Date(date);
    const minutes = String(d.getMinutes()).padStart(2, "0").padEnd(2, "0");
    return d.getHours() + ":" + minutes;
}

export const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    container: {
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        width: "98%",
        height: 50,
        padding: 5,
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 5,
    },
    available: {
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: "#38FF88",
    },
    notAvailable: {
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: "#FF4438",
    },
    description: {
        color: "#2B363F",
        fontFamily: "Poppins_500Medium",
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },

    rowContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 50,
        padding: 5,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: "white",
        boxShadow: "0px 0px 5px rgba(56, 73, 86, 0.1)",
    },
    slotRoom: {
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
        paddingRight: 5,
        marginLeft: 5,
        borderRightWidth: 1,
        borderRightColor: "#2B363F",
        borderRightStyle: "solid",
        minWidth: "15%",
        textAlign: "center",
    },
    slotTime: {
        maxWidth: "50%",
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
        textAlign: "center",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
});
