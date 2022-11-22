import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RoomsScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rooms</Text>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
