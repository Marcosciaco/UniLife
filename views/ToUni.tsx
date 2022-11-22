import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ToUniScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Go to university</Text>
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
