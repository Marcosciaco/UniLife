import * as Location from "expo-location";
import React from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import Dialog from "react-native-dialog";
import DatePicker from "react-native-modern-datepicker";
import { CategoryCode } from "../../models/CategoryCode";
import { auth } from "../../utils/Firebase";
import { getGastronomyLocales } from "../../utils/GastronomyAPIUtil";
import {
    dark,
    error,
    light,
    primary,
    secondary,
    success,
    white,
    width,
} from "../../utils/Theme";
import { createEvent, getFollowing } from "../../utils/UserService";
import ColorPicker from "../Inputs/ColorPicker";
import Select from "../Inputs/Select";

export default function EventCreation({ onCreate }: { onCreate: Function }) {
    const [restaurants, setRestaurants] = React.useState<any[]>([]);
    const [users, setUsers] = React.useState<string[]>([]);

    const [eventName, setEventName] = React.useState("");
    const [eventDescription, setEventDescription] = React.useState("");
    const [eventLocation, setEventLocation] = React.useState("");
    const [eventDate, setEventDate] = React.useState("");
    const [eventPartecipant, setEventPartecipant] = React.useState("");
    const [eventColor, setEventColor] = React.useState("");

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

    React.useEffect(() => {
        getFollowing().then((data) => {
            setUsers(
                data.filter(
                    (user) => user !== auth.currentUser?.email && user !== ""
                )
            );
        });
    }, []);

    return (
        <View>
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
                        onChangeText={(text) => setEventName(text)}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder="Event Description"
                        value={eventDescription}
                        onChangeText={(text) => setEventDescription(text)}
                    ></TextInput>
                    <Select
                        data={[...restaurants]}
                        label="Select Restaurant"
                        onChange={(text: string) => {
                            setEventLocation(text);
                        }}
                    />
                    <Select
                        data={[...users]}
                        label="Select Friend"
                        onChange={(text: string) => {
                            setEventPartecipant(text);
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
                        onSelectedChange={(text: string) => setEventDate(text)}
                    />
                </View>
                <ColorPicker
                    colors={[primary, secondary, dark, success, error]}
                    onChange={(color: string) => setEventColor(color)}
                />
            </ScrollView>
            <Dialog.Button
                label="Add"
                onPress={() => {
                    createEvent(
                        eventName,
                        eventDescription,
                        eventLocation,
                        new Date(eventDate),
                        [auth.currentUser?.email || "", eventPartecipant],
                        eventColor
                    );
                    onCreate();
                }}
            ></Dialog.Button>
        </View>
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
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: white,
        borderRadius: 10,
        padding: 10,
    },
});
