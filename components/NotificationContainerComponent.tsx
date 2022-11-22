import React from "react";
import { View, Text } from "react-native";
import { InviteNotification } from "./InviteNotification";

export default function NotificationContainer() {
    return (
        <View
            style={{
                marginHorizontal: 20,
                backgroundColor: "#F3F8FF",
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                height: "25%",
                borderRadius: 15,
                overflow: "hidden",
            }}
        >
            <Text
                style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 15,
                    lineHeight: 30,
                    padding: 5,
                    paddingBottom: 0,
                    paddingLeft: 10,
                    textAlign: "left",
                }}
            >
                Notifications
            </Text>
            <InviteNotification
                person="Marco"
                type="drink"
            ></InviteNotification>
        </View>
    );
}
