import * as Location from "expo-location";
import React, { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AddIcon from "../assets/icons/add";
import MenuIcon from "../assets/icons/menu";
import EventCreation from "../components/Socialize/EventCreationDialog";
import EventDescription from "../components/Socialize/EventEntryDescription";
import { CategoryCode } from "../models/CategoryCode";
import { Event } from "../models/Event";
import { auth } from "../utils/Firebase";
import { getGastronomyLocales } from "../utils/GastronomyAPIUtil";
import {
    black,
    dark,
    error,
    light,
    primary,
    secondary,
    white,
} from "../utils/Theme";
import Dialog from "react-native-dialog";
import { getFollowing, getProfileEvents } from "../utils/UserService";
import CloseIcon from "../assets/icons/close";

const { width } = Dimensions.get("window");

export default function SocializeScreen({ navigation }: any) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [markedDates, setMarkedDates] = React.useState({});
    const [filteredEvents, setFilteredEvents] = React.useState<Event[]>([]);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        getProfileEvents(auth.currentUser?.email || "").then((data) => {
            setFilteredEvents(data);
            data.forEach((event: Event) => {
                const date = new Date(event.date);
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
                            <EventCreation></EventCreation>
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
    iconContainer: {
        backgroundColor: "#F3F8FF",
        height: 50,
        width: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
});
