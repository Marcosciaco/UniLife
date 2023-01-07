import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import Dialog from "react-native-dialog";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AddIcon from "../assets/icons/add";
import CloseIcon from "../assets/icons/close";
import MenuIcon from "../assets/icons/menu";
import EventCreation from "../components/Socialize/EventCreationDialog";
import EventDescription from "../components/Socialize/EventEntryDescription";
import { Event } from "../models/Event";
import { auth } from "../utils/Firebase";
import {
    black,
    dark,
    error,
    light,
    primary,
    secondary,
    white,
    width
} from "../utils/Theme";
import { getProfileEvents } from "../utils/UserService";

function getMarkedDates(events: Event[]): MarkedDates {
    const markedDates: any = {};
    events.forEach((event: Event) => {
        const date = new Date(event.date);
        markedDates[date.toISOString().split("T")[0]] = {
            marked: true,
            dotColor: event.color || error,
        };
    });
    return markedDates;
}

function getEventsForDate({ onReturn }: { onReturn: Function }): void {
    getProfileEvents(auth.currentUser?.email || "").then((data) => {
        onReturn(data);
    });
}

export default function SocializeScreen({ navigation }: any) {
    const [filteredEvents, setFilteredEvents] = React.useState<Event[]>([]);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        getEventsForDate({
            onReturn: (data: Event[]) => {
                setFilteredEvents(
                    data.filter((event: Event) => {
                        const date = new Date(event.date);
                        const today = new Date();

                        return date.getTime() >= today.getTime();
                    })
                );
            },
        });
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Pressable
                            onPress={() => {
                                navigation.openDrawer();
                            }}
                        >
                            <MenuIcon color={dark} height={30} width={30} />
                        </Pressable>
                        <Text style={styles.title}>Events</Text>
                        <Pressable onPress={() => setVisible(true)}>
                            <View style={styles.iconContainer}>
                                <AddIcon
                                    height={20}
                                    width={20}
                                    color={dark}
                                ></AddIcon>
                            </View>
                        </Pressable>
                        <Dialog.Container
                            visible={visible}
                            contentStyle={{
                                backgroundColor: light,
                                borderRadius: 10,
                                width: width - 20,
                            }}
                            onBackdropPress={() => setVisible(false)}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Dialog.Title>Add Event</Dialog.Title>
                                <Pressable
                                    style={{
                                        backgroundColor: white,
                                        borderRadius: 20,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 30,
                                        height: 30,
                                    }}
                                    onPress={() => setVisible(false)}
                                >
                                    <CloseIcon
                                        height={20}
                                        width={20}
                                        color={dark}
                                    />
                                </Pressable>
                            </View>
                            <EventCreation
                                onCreate={() => {
                                    getEventsForDate({
                                        onReturn: (data: Event[]) => {
                                            setFilteredEvents(data);
                                        },
                                    });
                                }}
                            ></EventCreation>
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
                                selectedDayBackgroundColor: white,
                                selectedDayTextColor: dark,
                                textDayHeaderFontSize: 8,
                            }}
                            markedDates={getMarkedDates(filteredEvents)}
                            style={styles.calendar}
                        />
                    </View>
                    <ScrollView
                        style={{
                            width: width - 40,
                            marginLeft: 20,
                            marginTop: 10,
                        }}
                    >
                        {filteredEvents.map((event: Event) => (
                            <EventDescription
                                key={event.id}
                                event={event}
                            ></EventDescription>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: light,
        alignItems: "center",
    },
    header: {
        display: "flex",
        width: width,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
    calendar: {
        width: width - 40,
        marginLeft: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    safeAreaView: {
        backgroundColor: "#FBFDFF",
        flexGrow: 1,
    },
    iconContainer: {
        backgroundColor: "#F3F8FF",
        height: 50,
        width: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
});
