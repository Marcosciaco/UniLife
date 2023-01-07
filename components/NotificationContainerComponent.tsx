import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { Event } from "../models/Event";
import { white } from "../utils/Theme";
import { getProfileEvents, getUserEmail } from "../utils/UserService";
import { InviteNotification } from "./InviteNotification";

export default function NotificationContainer(): JSX.Element {
    const [requests, setRequests] = React.useState<Event[]>([]);

    React.useEffect(() => {
        getProfileEvents(getUserEmail()).then((data: Event[]) => {
            setRequests(data);
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
                        .filter((request) => getUserEmail() != request.creator)
                        // .filter((request) => !request.inviteRead)
                        .map((request) => (
                            <InviteNotification
                                event={request}
                                key={new Date(request.date).getTime()}
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
        borderRadius: 15,
        overflow: "hidden",
        height: "20%",
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
