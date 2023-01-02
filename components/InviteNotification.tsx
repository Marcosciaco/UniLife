import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    Alert,
    StyleSheet,
} from "react-native";
import MailIcon from "../assets/icons/mail";
import {
    acceptFollowRequest,
    declineFollowRequest,
    getUsernameByEmail,
} from "../utils/UserService";

export function confirmInvitation(mail: string) {
    return Alert.alert("Do you want to accept " + mail + "'s invitation?", "", [
        {
            text: "Cancel",
            onPress: () => declineFollowRequest(mail),
            style: "cancel",
        },
        { text: "OK", onPress: () => acceptFollowRequest(mail) },
    ]);
}

export function InviteNotification({
    email,
    type,
}: {
    email: string;
    type: string;
}) {
    const [username, setUsername] = React.useState<string>("");

    React.useEffect(() => {
        getUsernameByEmail(email).then((username) => {
            setUsername(username);
        });
    }, []);

    return (
        <TouchableHighlight
            onPress={() => {
                confirmInvitation(email);
            }}
            underlayColor="#F3F8FF"
        >
            <View style={styles.container}>
                <MailIcon color={"#2B363F"} height={30} width={30}></MailIcon>
                <Text style={styles.inviteText}>Invite by </Text>
                <Text style={styles.inviteName}>{username}</Text>
                <Text style={{ fontFamily: "Poppins_400Regular" }}>
                    {" "}
                    for a {type}.
                </Text>
            </View>
        </TouchableHighlight>
    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FBFDFF",
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    inviteName: {
        color: "#AECFFF",
        fontFamily: "Poppins_600SemiBold",
    },

    inviteType: {
        fontFamily: "Poppins_400Regular",
    },

    inviteText: {
        paddingLeft: 10,
        fontFamily: "Poppins_400Regular",
    },
});
