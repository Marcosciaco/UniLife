import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarIcon from "../../assets/icons/calendar";
import GroupIcon from "../../assets/icons/group";
import PinIcon from "../../assets/icons/pin";
import { Event } from "../../models/Event";
import { formatDate } from "../../utils/DateUtil";
import { dark, light, secondary, white, width } from "../../utils/Theme";
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
            <View style={styles.row}>
                <View style={styles.rowIcon}>
                    <GroupIcon height={20} width={20} color={dark}></GroupIcon>
                </View>
                {event.partecipants.map((p) => {
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
                            <Text style={styles.eventChip}>{name}</Text>
                        </View>
                    );
                })}
            </View>
            <View
                style={{
                    alignSelf: "flex-start",
                }}
            >
                <View style={styles.row}>
                    <View style={styles.rowIcon}>
                        <PinIcon height={20} width={20} color={dark}></PinIcon>
                    </View>
                    <Text style={styles.eventChip}>{event.location}</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowIcon}>
                        <CalendarIcon
                            height={20}
                            width={20}
                            color={dark}
                        ></CalendarIcon>
                    </View>
                    <Text style={styles.eventChip}>
                        {formatDate(event.date)}
                    </Text>
                </View>
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
        marginBottom: 10,
    },
    eventChip: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: dark,
        paddingHorizontal: 10,
        margin: 5,
        backgroundColor: light,
        borderRadius: 10,
        padding: 5,
    },
    rowIcon: {
        borderRightWidth: 1,
        padding: 7,
        marginRight: 5,
        borderRightColor: dark,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: white,
        width: width - 55,
        padding: 5,
        borderRadius: 10,
        marginBottom: 10,
    },
});
