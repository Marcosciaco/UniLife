import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { InviteNotification } from "./InviteNotification";

export default function NotificationContainer() {
    return (
        <Animated.View
            entering={FadeInLeft.delay(400).duration(400)}
            style={styles.container}
        >
            <View>
                <Text style={styles.notificationTitle}>Notifications</Text>
                <InviteNotification
                    person="Marco"
                    type="drink"
                ></InviteNotification>
            </View>
        </Animated.View>
    );
}

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        backgroundColor: "#F3F8FF",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: "25%",
        borderRadius: 15,
        overflow: "hidden",
    },

    notificationTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15,
        lineHeight: 30,
        padding: 5,
        paddingBottom: 0,
        paddingLeft: 10,
        textAlign: "left",
    },
});
