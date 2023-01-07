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
} from "../../utils/Theme";
import { createEvent, getFollowing } from "../../utils/UserService";
import ColorPicker from "../Inputs/ColorPicker";
import Select from "../Inputs/Select";

export default function EventCreation({
    onCreate,
}: {
    onCreate: Function;
}): JSX.Element {
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
                        options={styles.datePickerOptions}
                        style={styles.datePicker}
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
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: white,
        borderRadius: 10,
        padding: 10,
    },
    datePickerOptions: {
        backgroundColor: white,
        textHeaderColor: primary,
        textDefaultColor: dark,
        selectedTextColor: light,
        mainColor: primary,
        textSecondaryColor: secondary,
    },
    datePicker: {
        borderRadius: 10,
    },
});
