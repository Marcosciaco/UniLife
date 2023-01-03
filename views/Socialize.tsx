import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AddIcon from "../assets/icons/add";
import { auth } from "../utils/Firebase";
import { createEvent, getProfileEvents } from "../utils/UserService";
import Dialog from "react-native-dialog";
import { Event } from "../models/Event";
import DatePicker from "react-native-modern-datepicker";
import {
    black,
    dark,
    error,
    light,
    primary,
    secondary,
    white,
} from "../utils/Theme";
import SelectDropdown from "react-native-select-dropdown";
import { getGastronomyLocales } from "../utils/GastronomyAPIUtil";
import { CategoryCode } from "../models/CategoryCode";
import * as Location from "expo-location";
import LessIcon from "../assets/icons/less";
import MoreIcon from "../assets/icons/expand";

const { width } = Dimensions.get("window");

export default function SocializeScreen({ navigation }: any) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [markedDates, setMarkedDates] = React.useState({});
    const [events, setEvents] = React.useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = React.useState<Event[]>([]);
    const [restaurants, setRestaurants] = React.useState<any[]>([]);

    const [visible, setVisible] = React.useState(false);
    const [eventName, setEventName] = React.useState("");
    const [eventDescription, setEventDescription] = React.useState("");
    const [eventLocation, setEventLocation] = React.useState("");
    const [eventDate, setEventDate] = React.useState("");

    React.useEffect(() => {
        (async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            Location.getCurrentPositionAsync({}).then((location) => {
                getGastronomyLocales(
                    CategoryCode.CAFE,
                    location.coords.latitude,
                    location.coords.longitude,
                    100000
                ).then((data) => {
                    const restaurants = data.map(
                        (restaurant) => restaurant.Detail.de.Title
                    );
                    setRestaurants(restaurants);
                });
            });
        })();
    }, []);

    useEffect(() => {
        getProfileEvents(auth.currentUser?.email || "").then((data) => {
            setEvents(data);
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
                        <Dialog.Container
                            visible={visible}
                            contentStyle={{
                                backgroundColor: light,
                                borderRadius: 10,
                                width: width - 20,
                            }}
                        >
                            <Dialog.Title>Add Event</Dialog.Title>
                            <ScrollView>
                                <View
                                    style={{
                                        margin: 10,
                                    }}
                                >
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Event Name"
                                        value={eventName}
                                        onChangeText={(text) =>
                                            setEventName(text)
                                        }
                                    ></TextInput>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Event Description"
                                        value={eventDescription}
                                        onChangeText={(text) =>
                                            setEventDescription(text)
                                        }
                                    ></TextInput>
                                    <SelectDropdown
                                        data={[...restaurants]}
                                        defaultButtonText="Select Restaurant"
                                        onSelect={(selectedItem, index) => {}}
                                        buttonTextAfterSelection={(
                                            selectedItem
                                        ) => {
                                            return selectedItem;
                                        }}
                                        rowTextForSelection={(item) => {
                                            return item;
                                        }}
                                        onChangeSearchInputText={(text) => {}}
                                        renderDropdownIcon={(isOpened) => {
                                            if (isOpened) {
                                                return (
                                                    <LessIcon
                                                        height={20}
                                                        width={20}
                                                        color={dark}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <MoreIcon
                                                        height={20}
                                                        width={20}
                                                        color={dark}
                                                    />
                                                );
                                            }
                                        }}
                                        buttonStyle={{
                                            borderRadius: 10,
                                            marginBottom: 10,
                                            width: width - 75,
                                            height: 40,
                                            backgroundColor: white,
                                        }}
                                        buttonTextStyle={{
                                            color: dark,
                                            fontSize: 16,
                                            textAlign: "center",
                                        }}
                                        rowStyle={{
                                            backgroundColor: white,
                                            height: 40,
                                        }}
                                        rowTextStyle={{
                                            color: dark,
                                            fontSize: 16,
                                            textAlign: "center",
                                        }}
                                    />
                                    <DatePicker
                                        options={{
                                            backgroundColor: white,
                                            textHeaderColor: primary,
                                            textDefaultColor: dark,
                                            selectedTextColor: light,
                                            mainColor: primary,
                                            textSecondaryColor: secondary,
                                        }}
                                        style={{
                                            borderRadius: 10,
                                        }}
                                        minuteInterval={10}
                                        onSelectedChange={(text: string) =>
                                            setEventDate(text)
                                        }
                                    />
                                </View>
                            </ScrollView>
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
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: white,
        borderRadius: 10,
        padding: 10,
    },
});
