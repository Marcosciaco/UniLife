import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Event } from "../../models/Event";
import { formatDate } from "../../utils/DateUtil";
import { dark, error, success, width } from "../../utils/Theme";
import {
    acceptInvite,
    declineInvite,
    getUsernameByEmail,
} from "../../utils/UserService";

export default function InviteConfirmationDialog({
    event,
}: {
    event: Event;
}): JSX.Element {
    const [username, setUsername] = React.useState<string>("");

    React.useEffect(() => {
        getUsernameByEmail(event.creator).then((username) => {
            setUsername(username);
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.eventTitle}>
                {username} invited you to {event.name}
            </Text>
            <Text>
                Do you want to meet {username} at {event.location} on{" "}
                {formatDate(event.date)}?
            </Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.buttonAccept}
                    onPress={() => {
                        acceptInvite(event);
                    }}
                >
                    <Text style={styles.buttonText}>Accept</Text>
                </Pressable>
                <Pressable
                    style={styles.buttonDecline}
                    onPress={() => {
                        declineInvite(event);
                    }}
                >
                    <Text style={styles.buttonText}>Decline</Text>
                </Pressable>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: -10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        width: width - 75,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        width: width - 75,
        justifyContent: "space-between",
        marginTop: 20,
    },
    buttonAccept: {
        backgroundColor: success,
        height: 30,
        borderRadius: 5,
        elevation: 2,
        paddingHorizontal: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonDecline: {
        backgroundColor: error,
        height: 30,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: dark,
        fontFamily: "Poppins_400Regular",
    },
    eventTitle: {
        width: width - 75,
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
        color: dark,
    },
});
