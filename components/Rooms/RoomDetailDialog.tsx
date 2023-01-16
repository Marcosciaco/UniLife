import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { RoomSlot } from "../../models/RoomSlot";
import { dark, height, light, primary, white, width } from "../../utils/Theme";
import RoomTimeEntry from "./RoomTimeEntry";

export default function RoomDetailDialog({
    room,
}: {
    room: RoomSlot;
}): JSX.Element {
    const slots = [...room.freeSlots, ...room.reservedSlots];

    slots.map((slot) => {
        slot.start = slot.start === null ? "0" : slot.start;
        slot.end = slot.end === null ? "9" : slot.end;
    });

    slots.sort((a, b) => {
        return a.start.localeCompare(b.start);
    });

    return (
        <View style={styles.content}>
            <Text style={styles.title}>
                {room.room.campus} {room.room.building}
                {room.room.name}
            </Text>
            <FlatList
                style={styles.slots}
                data={slots}
                keyExtractor={(item) => item.start}
                renderItem={({ item }) => (
                    <RoomTimeEntry
                        room={room.room}
                        slot={item}
                        free={room.freeSlots.includes(item)}
                    ></RoomTimeEntry>
                )}
            ></FlatList>
        </View>
    );
}

export const styles = StyleSheet.create({
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: light,
        marginTop: -25,
        borderRadius: 10,
    },
    slots: {
        marginTop: 10,
        paddingHorizontal: 10,
        width: "100%",
    },
    title: {
        fontSize: 20,
        color: dark,
        paddingHorizontal: 10,
        fontFamily: "Poppins_500Medium",
    },
});
