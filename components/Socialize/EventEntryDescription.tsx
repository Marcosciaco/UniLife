import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Event } from "../../models/Event";
import { dark, white } from "../../utils/Theme";

const { width } = Dimensions.get("window");

export default function EventDescription({ event }: { event: Event }) {
    const d = new Date(event.date);

    return (
        <View key={event.id} style={styles.event}>
            <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{event.name}</Text>
                <View
                    style={{
                        backgroundColor: event.color || "red",
                        height: 10,
                        width: 10,
                        borderRadius: 15,
                        marginRight: 10,
                    }}
                ></View>
            </View>
            <View style={styles.eventDescription}>
                <Text style={styles.eventTextHighlight}>
                    {d.getDay() + 1}.{d.getMonth() + 1}.{d.getFullYear()}
                </Text>
                <Text style={styles.eventText}>-</Text>
                <Text style={styles.eventTextHighlight}>
                    {d.getHours()}:{d.getMinutes()}
                </Text>
                <Text style={styles.eventText}> at </Text>
                <Text style={styles.eventTextHighlight}>{event.location}</Text>
                <Text style={styles.eventText}> with </Text>
                <Text style={styles.eventTextHighlight}>
                    {event.partecipants}
                </Text>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    event: {
        height: 80,
        width: width - 20,
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
});
