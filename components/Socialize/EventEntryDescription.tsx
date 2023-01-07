import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { Event } from "../../models/Event";
import { formatDate } from "../../utils/DateUtil";
import { dark, light, white, width } from "../../utils/Theme";
import { getUsernameByEmail } from "../../utils/UserService";
import Dialog from "react-native-dialog";
import EventDetails from "./EventEntryDetailDialog";

export default function EventDescription({
    event,
    delay,
}: {
    event: Event;
    delay: number;
}): JSX.Element {
    const [partecipants, setPartecipants] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);

    React.useEffect(() => {
        setPartecipants([]);
        event.partecipants
            .filter((p) => p !== event.creator)
            .forEach((p) => {
                getUsernameByEmail(p).then((name) => {
                    setPartecipants((prev) => [...prev, name]);
                });
            });
    }, []);

    return (
        <Animated.View
            key={event.id}
            style={styles.event}
            entering={FadeInLeft.delay(delay)}
        >
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Dialog.Container
                    visible={visible}
                    contentStyle={styles.dialogContent}
                    onBackdropPress={() => setVisible(false)}
                >
                    <EventDetails event={event}></EventDetails>
                </Dialog.Container>
                <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>{event.name}</Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.eventTextHighlight}>
                            {event.location}
                        </Text>
                        <View
                            style={{
                                backgroundColor: event.color || "red",
                                height: 10,
                                width: 10,
                                borderRadius: 15,
                                marginRight: 10,
                                marginLeft: 10,
                            }}
                        ></View>
                    </View>
                </View>
                <View style={styles.eventDescription}>
                    <Text style={styles.eventText}>
                        {formatDate(event.date)}
                    </Text>
                    <Text style={styles.eventText}> with </Text>
                    <Text style={styles.eventTextHighlight}>
                        {partecipants}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

export const styles = StyleSheet.create({
    event: {
        height: 80,
        width: width - 40,
        backgroundColor: white,
        borderRadius: 15,
        marginTop: 10,
    },
    eventTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20,
        color: dark,
        marginLeft: 10,
        marginTop: 10,
    },
    eventDescription: {
        fontFamily: "Poppins_400Regular",
        fontSize: 15,
        color: dark,
        marginLeft: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    eventHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    eventText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 15,
        color: dark,
    },
    eventTextHighlight: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15,
        color: dark,
    },
    dialogContent: {
        backgroundColor: light,
        borderRadius: 10,
        width: width - 20,
    },
});
