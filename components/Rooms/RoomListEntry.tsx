import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { RoomSlot } from "../../models/RoomSlot";
import {
    dark,
    error,
    height,
    light,
    success,
    white,
    width,
} from "../../utils/Theme";
import Dialog from "react-native-dialog";
import RoomDetailDialog from "./RoomDetailDialog";

export default function RoomListEntry({
    room,
    delay,
}: {
    room: RoomSlot;
    delay: number;
}): JSX.Element {
    const [available, setAvailable] = React.useState(false);
    const [actual, setActual] = React.useState(room.freeSlots[0]);
    const [dialogVisible, setDialogVisible] = React.useState(false);

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
            <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => setDialogVisible(true)}
            >
                <View style={styles.slotRoom}>
                    <Text style={styles.slotRoomText}>
                        {room.room.campus} {room.room.building}
                        {room.room.name}
                    </Text>
                </View>
                <View style={styles.slotTime}>
                    <Text style={styles.slotTimeText} numberOfLines={1}>
                        {getHour(actual.start) === "1:00"
                            ? "Opening"
                            : getHour(actual.start)}
                        -
                        {getHour(actual.end) === "1:00"
                            ? "Closing"
                            : getHour(actual.end)}
                        {!available
                            ? " - " +
                              (actual.description || "No description found")
                            : ""}
                    </Text>
                </View>
                {available ? (
                    <View style={styles.available}></View>
                ) : (
                    <View style={styles.notAvailable}></View>
                )}
            </TouchableOpacity>
            <Dialog.Container
                visible={dialogVisible}
                onBackdropPress={() => setDialogVisible(false)}
                contentStyle={{
                    borderRadius: 10,
                    width: width - 20,
                    backgroundColor: light,
                }}
            >
                <RoomDetailDialog room={room}></RoomDetailDialog>
            </Dialog.Container>
        </Animated.View>
    );
}

function getHour(date: string): string {
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
        backgroundColor: white,
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
        backgroundColor: success,
    },
    notAvailable: {
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: error,
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
        backgroundColor: white,
        boxShadow: "0px 0px 5px rgba(56, 73, 86, 0.1)",
    },
    slotRoom: {
        paddingRight: 5,
        marginLeft: 5,
        borderRightWidth: 1,
        width: 80,
        borderRightColor: dark,
        borderRightStyle: "solid",
    },
    slotRoomText: {
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
    },
    slotTime: {
        width: "50%",
    },
    slotTimeText: {
        maxWidth: "100%",
        fontSize: 12,
        fontFamily: "Poppins_600SemiBold",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
});
