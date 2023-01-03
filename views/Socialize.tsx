import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Pressable,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AddIcon from "../assets/icons/add";
import { auth } from "../utils/Firebase";
import { createEvent, getProfileEvents } from "../utils/UserService";
import Dialog from "react-native-dialog";
import { Event } from "../models/Event";
import {
    black,
    dark,
    error,
    light,
    primary,
    secondary,
    white,
} from "../utils/Theme";

const { width } = Dimensions.get("window");

export default function SocializeScreen({ navigation }: any) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [markedDates, setMarkedDates] = React.useState({});
    const [events, setEvents] = React.useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = React.useState<Event[]>([]);

    const [visible, setVisible] = React.useState(false);
    const [eventName, setEventName] = React.useState("");
    const [eventDescription, setEventDescription] = React.useState("");
    const [eventLocation, setEventLocation] = React.useState("");
    const [eventDate, setEventDate] = React.useState("");

    useEffect(() => {
        getProfileEvents(auth.currentUser?.email || "").then((data) => {
            setEvents(data);
            setFilteredEvents(data);

            data.forEach((event: Event) => {
                const date = new Date(event.date);
                console.log(date.toISOString());

                setMarkedDates((prev: any) => {
                    return {
                        ...prev,
                        [date.toISOString().split("T")[0]]: {
                            marked: true,
                            dotColor: event.color || error,
                        },
                    };
                });
            });
        });
    }, [selectedDate]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>Upcoming Events</Text>
                        <Pressable onPress={() => setVisible(true)}>
                            <View style={styles.iconContainer}>
                                <AddIcon
                                    height={20}
                                    width={20}
                                    color={dark}
                                ></AddIcon>
                            </View>
                        </Pressable>
                        <Dialog.Container visible={visible}>
                            <Dialog.Title>Add Event</Dialog.Title>
                            <Dialog.Input
                                label="Event Name"
                                value={eventName}
                                onChangeText={(text) => setEventName(text)}
                            ></Dialog.Input>
                            <Dialog.Input
                                label="Event Description"
                                value={eventDescription}
                                onChangeText={(text) =>
                                    setEventDescription(text)
                                }
                            ></Dialog.Input>
                            <Dialog.Input
                                label="Event Location"
                                value={eventLocation}
                                onChangeText={(text) => setEventLocation(text)}
                            ></Dialog.Input>
                            <Dialog.Input
                                label="Event Date"
                                value={eventDate}
                                onChangeText={(text) => setEventDate(text)}
                            ></Dialog.Input>
                            <Dialog.Button
                                label="Cancel"
                                onPress={() => setVisible(false)}
                            ></Dialog.Button>
                            <Dialog.Button
                                label="Add"
                                onPress={() => {
                                    createEvent(
                                        eventName,
                                        eventDescription,
                                        eventLocation,
                                        new Date(),
                                        auth.currentUser?.email || "",
                                        error
                                    );
                                }}
                            ></Dialog.Button>
                        </Dialog.Container>
                    </View>
                    <View>
                        <Calendar
                            theme={{
                                backgroundColor: white,
                                calendarBackground: white,
                                todayTextColor: dark,
                                dayTextColor: black,
                                textDisabledColor: secondary,
                                monthTextColor: primary,
                                arrowColor: primary,
                                textDayFontWeight: "300",
                                textMonthFontWeight: "bold",
                                textDayHeaderFontWeight: "500",
                                textDayFontSize: 16,
                                textMonthFontSize: 18,
                                selectedDayBackgroundColor: primary,
                                selectedDayTextColor: light,
                                textDayHeaderFontSize: 8,
                            }}
                            markedDates={markedDates}
                            onDayPress={(day) => {
                                setSelectedDate(new Date(day.dateString));
                            }}
                            style={styles.calendar}
                        />
                    </View>
                    <ScrollView>
                        {filteredEvents.map((event: Event) => (
                            <View key={event.id} style={styles.event}>
                                <Text style={styles.eventTitle}>
                                    {event.name}
                                </Text>
                                <Text style={styles.eventDescription}>
                                    {event.description}
                                </Text>
                                <Text style={styles.eventLocation}>
                                    {event.location}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: light,
        alignItems: "center",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    calendar: {
        width: width - 20,
        borderRadius: 10,
        marginTop: 20,
    },
    safeAreaView: {
        backgroundColor: "#FBFDFF",
        flexGrow: 1,
    },
    buttonText: {
        fontSize: 20,
        lineHeight: 30,
        marginTop: 2,
        fontFamily: "Poppins_300Light",
        color: "#2B363F",
        textAlign: "center",
        flex: 1,
        marginRight: 20,
    },
    button: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#F3F8FF",
        marginBottom: 0,
        padding: 10,
        borderRadius: 15,
        height: 50,
        width: width - 40,
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconContainer: {
        backgroundColor: "#F3F8FF",
        height: 50,
        width: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    event: {
        height: 80,
        width: width - 20,
        backgroundColor: "#F3F8FF",
        borderRadius: 15,
        marginVertical: 10,
        padding: 5,
    },
    eventTitle: {
        fontSize: 20,
        lineHeight: 30,
        fontFamily: "Poppins_300Light",
        color: "#2B363F",
        textAlign: "left",
    },
    eventDescription: {
        fontSize: 20,
        lineHeight: 30,
        marginTop: 2,
        fontFamily: "Poppins_300Light",
        color: "#2B363F",
        textAlign: "center",
        flex: 1,
        marginRight: 20,
    },
    eventLocation: {
        fontSize: 20,
        lineHeight: 30,
        marginTop: 2,
        fontFamily: "Poppins_300Light",
        color: "#2B363F",
        textAlign: "center",
        flex: 1,
        marginRight: 20,
    },
    eventDate: {
        fontSize: 20,
        lineHeight: 30,
        marginTop: 2,
        fontFamily: "Poppins_300Light",
        color: "#2B363F",
        textAlign: "center",
        flex: 1,
        marginRight: 20,
    },
});
