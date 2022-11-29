import React from "react";
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
import CalendarIcon from "../assets/icons/calendar";

const { width } = Dimensions.get("window");

export default function SocializeScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View>
                    <Pressable style={styles.button}>
                        <View style={styles.iconContainer}>
                            <AddIcon
                                height={20}
                                width={20}
                                color="#2B363F"
                            ></AddIcon>
                        </View>
                        <Text style={styles.buttonText}>Create Event</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <View style={styles.iconContainer}>
                            <CalendarIcon
                                height={20}
                                width={20}
                                color="#2B363F"
                            ></CalendarIcon>
                        </View>
                        <Text style={styles.buttonText}>Manage Events</Text>
                    </Pressable>
                </View>
                <Calendar
                    markingType="multi-period"
                    markedDates={{
                        "2022-11-14": {
                            periods: [
                                {
                                    startingDay: true,
                                    endingDay: true,
                                    color: "#007BE2",
                                },
                            ],
                        },
                    }}
                    style={styles.calendar}
                />
                <ScrollView>
                    <View style={styles.event}></View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    calendar: {
        width: width - 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        marginTop: 20,
    },
    safeAreaView: {
        backgroundColor: "#FBFDFF",
        paddingTop: StatusBar.currentHeight,
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
        margin: 20,
        marginBottom: 0,
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
        width: width - 40,
        backgroundColor: "#F3F8FF",
        borderRadius: 15,
        margin: 20,
        marginBottom: 0,
    },
});
