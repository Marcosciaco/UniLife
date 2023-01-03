import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { light } from "../utils/Theme";

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
        backgroundColor: light,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
