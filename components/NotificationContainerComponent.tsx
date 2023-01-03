import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { white } from "../utils/Theme";
import { getFollowRequests, getUsernameByEmail } from "../utils/UserService";
import { InviteNotification } from "./InviteNotification";

export default function NotificationContainer() {
    const [requests, setRequests] = React.useState<any[]>([]);

    React.useEffect(() => {
        getFollowRequests().then((requests) => {
            console.log(requests);

            setRequests(requests);
        });
    }, []);

    return (
        <Animated.View
            entering={FadeInLeft.delay(400).duration(400)}
            style={styles.container}
        >
            <View>
                <Text style={styles.notificationTitle}>Notifications</Text>
                <View>
                    {requests
                        .filter((request) => request != "")
                        .map((request) => (
                            <InviteNotification
                                email={request}
                                type="follow"
                                key={request.uid}
                            />
                        ))}
                </View>
            </View>
        </Animated.View>
    );
}

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        backgroundColor: white,
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
