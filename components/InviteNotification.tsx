import React from "react";
import { View, Text, TouchableHighlight, Alert } from "react-native";
import MailIcon from "../assets/icons/mail";

export default function confirmInvitation() {
    return Alert.alert(
        "Do you want to accept the invitation?",
        "",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
    );
}

export function InviteNotification({
    person,
    type,
}: {
    person: string;
    type: string;
}) {
    return (
        <TouchableHighlight
            onPress={() => {
                confirmInvitation();
            }}
            underlayColor="#F3F8FF"
        >
            <View
                style={{
                    backgroundColor: "#FBFDFF",
                    borderRadius: 5,
                    padding: 5,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <MailIcon color={"#2B363F"} height={30} width={30}></MailIcon>
                <Text
                    style={{
                        paddingLeft: 10,
                        fontFamily: "Poppins_400Regular",
                    }}
                >
                    Invite by{" "}
                </Text>
                <Text
                    style={{
                        color: "#AECFFF",
                        fontFamily: "Poppins_600SemiBold",
                    }}
                >
                    {person}
                </Text>
                <Text style={{ fontFamily: "Poppins_400Regular" }}>
                    {" "}
                    for a {type}.
                </Text>
            </View>
        </TouchableHighlight>
    );
}
