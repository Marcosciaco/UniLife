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
import { SafeAreaView } from "react-native-safe-area-context";
import AddIcon from "../assets/icons/add";

const { width } = Dimensions.get("window");

export default function SocializeScreen({ navigation }: any) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [markedDates, setMarkedDates] = React.useState({});

    useEffect(() => {
        console.log(selectedDate);
    }, [selectedDate]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>Upcoming Events</Text>
                        <Pressable>
                            <View style={styles.iconContainer}>
                                <AddIcon
                                    height={20}
                                    width={20}
                                    color="#2B363F"
                                ></AddIcon>
                            </View>
                        </Pressable>
                    </View>
                    <View>
                        <Calendar
                            theme={{
                                backgroundColor: "#ffffff",
                                calendarBackground: "#ffffff",
                                todayTextColor: "#57B9BB",
                                dayTextColor: "#222222",
                                textDisabledColor: "#d9e1e8",
                                monthTextColor: "#57B9BB",
                                arrowColor: "#57B9BB",
                                textDayFontWeight: "300",
                                textMonthFontWeight: "bold",
                                textDayHeaderFontWeight: "500",
                                textDayFontSize: 16,
                                textMonthFontSize: 18,
                                selectedDayBackgroundColor: "#57B9BB",
                                selectedDayTextColor: "white",
                                textDayHeaderFontSize: 8,
                            }}
                            markedDates={{}}
                            onDayPress={(day) => {
                                setSelectedDate(new Date(day.dateString));
                            }}
                            style={styles.calendar}
                        />
                    </View>
                </View>

                {/* <View>
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
                <ScrollView>
                    <View style={styles.event}></View>
                </ScrollView> */}
            </View>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
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
        width: width - 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
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
        width: width - 40,
        backgroundColor: "#F3F8FF",
        borderRadius: 15,
        margin: 20,
        marginBottom: 0,
    },
});
