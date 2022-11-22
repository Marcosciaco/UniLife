import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MensaScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mensa</Text>
            <Text style={styles.text}>
                Hier findest du die Speisepläne der Mensen der Hochschule.
            </Text>
        </View>
    );
}

// Path: styles\styles.tsx
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
    text: {
        fontSize: 20,
        textAlign: "center",
        marginHorizontal: 20,
    },
});
