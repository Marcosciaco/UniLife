import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Event } from "../../models/Event";
import { formatDate } from "../../utils/DateUtil";
import { dark, light, white, width } from "../../utils/Theme";
import { getUsernameByEmail } from "../../utils/UserService";

export default function EventDetails({ event }: { event: Event }): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{event.name}</Text>
                <View
                    style={[
                        {
                            backgroundColor: event.color,
                        },
                        styles.eventColor,
                    ]}
                ></View>
            </View>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <View>
                {event.partecipants
                    .filter((p) => p != event.creator)
                    .map((p) => {
                        const [name, setName] = React.useState<string>("");

                        getUsernameByEmail(p).then((name) => {
                            setName(name);
                        });

                        return (
                            <View
                                key={p}
                                style={{
                                    alignSelf: "flex-start",
                                }}
                            >
                                <Text style={styles.eventPartecipants}>
                                    {name}
                                </Text>
                            </View>
                        );
                    })}
            </View>
            <View
                style={{
                    alignSelf: "flex-start",
                }}
            >
                <Text style={styles.eventLocation}>{event.location}</Text>
                <Text style={styles.eventLocation}>
                    {formatDate(event.date)}
                </Text>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: light,
        borderRadius: 10,
        width: width - 20,
        marginTop: -30,
    },
    eventColor: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 5,
    },
    eventTitle: {
        fontSize: 30,
        fontFamily: "Poppins_600SemiBold",
        color: dark,
    },
    eventHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingTop: 10,
        width: width - 40,
    },
    eventDescription: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: dark,
        paddingHorizontal: 10,
    },
    eventPartecipants: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: dark,
        paddingHorizontal: 10,
        margin: 5,
        backgroundColor: white,
        borderRadius: 10,
        padding: 5,
    },
    eventLocation: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: dark,
        paddingHorizontal: 10,
        margin: 5,
        backgroundColor: white,
        borderRadius: 10,
        padding: 5,
    },
});
