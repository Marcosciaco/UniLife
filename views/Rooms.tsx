import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterIcon from "../assets/icons/filter";
import MenuIcon from "../assets/icons/menu";
import RoomListEntry from "../components/Rooms/RoomListEntry";
import { RoomSlot } from "../models/RoomSlot";
import { isFree } from "../utils/RoomUtil";
import { dark, height, light, primary, width } from "../utils/Theme";

export default function RoomsScreen({ navigation }: any): JSX.Element {
    const [data, setData] = useState<RoomSlot[]>([]);
    const [notFilteredData, setNotFilteredData] = useState<RoomSlot[]>([]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const [campus, setCampus] = useState<string>("All");
    const [campuses, setCampuses] = useState<string[]>([]);

    const [available, setAvailable] = useState<boolean>();

    const [building, setBuilding] = useState<string>("All");
    const [buildings, setBuildings] = useState<string[]>([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, []);

    React.useEffect(() => {
        let data = notFilteredData;

        if (campus !== "All") {
            data = data.filter((room: RoomSlot) => room.room.campus === campus);
        }

        if (building !== "All") {
            data = data.filter(
                (room: RoomSlot) => room.room.building === building
            );
        }

        if (available === true) {
            console.log("available");
            data = data.filter((room: RoomSlot) => isFree(room));
        }

        setData(data);
    }, [campus, building, available]);

    const fetchData = async () => {
        const c: string[] = ["All"];
        const b: string[] = ["All"];

        const response = await fetch(
            "https://europe-west1-unibz-room-finder.cloudfunctions.net/roomsTimeSlots"
        );

        const data = await response.json();
        const da = data.data as RoomSlot[];

        da.forEach((room) => {
            room.room.id =
                room.room.campus + "_" + room.room.building + room.room.name;
            if (!c.includes(room.room.campus)) {
                c.push(room.room.campus);
            }
            if (!b.includes(room.room.building) && room.room.building !== "") {
                b.push(room.room.building);
            }
        });

        setData(data.data);
        setNotFilteredData(data.data);
        setCampuses(c);
        setBuildings(b);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <ExpoStatusBar backgroundColor="transparent" style="dark" />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.openDrawer();
                            }}
                        >
                            <MenuIcon height={30} width={30} color={dark} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Rooms</Text>
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <FilterIcon height={30} width={30} color={dark} />
                        </TouchableOpacity>
                        <Dialog.Container
                            visible={visible}
                            contentStyle={{
                                borderRadius: 20,
                            }}
                            onBackdropPress={() => setVisible(false)}
                        >
                            <Dialog.Title style={styles.filterTitle}>
                                Filter
                            </Dialog.Title>
                            <Dialog.Description
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                }}
                            >
                                <View>
                                    <Text style={styles.filterCampusLabel}>
                                        Only available Rooms?
                                    </Text>
                                    <View style={styles.filterCampus}>
                                        <TouchableOpacity
                                            style={[
                                                styles.category,
                                                {
                                                    borderColor: available
                                                        ? primary
                                                        : dark,
                                                },
                                            ]}
                                            onPress={() => setAvailable(true)}
                                        >
                                            <Text
                                                style={styles.filterCampusText}
                                            >
                                                Yes
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.category,
                                                {
                                                    borderColor: !available
                                                        ? primary
                                                        : dark,
                                                },
                                            ]}
                                            onPress={() => setAvailable(false)}
                                        >
                                            <Text
                                                style={styles.filterCampusText}
                                            >
                                                No
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.filterCampusLabel}>
                                        Campus
                                    </Text>
                                    <View style={styles.filterCampus}>
                                        {campuses.map((ca) => (
                                            <TouchableOpacity
                                                key={ca}
                                                onPress={() => {
                                                    setCampus(ca);
                                                }}
                                                style={[
                                                    styles.category,
                                                    {
                                                        borderColor:
                                                            ca === campus
                                                                ? primary
                                                                : dark,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.filterCampusText,
                                                        {
                                                            color:
                                                                ca === campus
                                                                    ? primary
                                                                    : dark,
                                                        },
                                                    ]}
                                                >
                                                    {ca}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <Text style={styles.filterCampusLabel}>
                                        Building
                                    </Text>
                                    <View style={styles.filterCampus}>
                                        {buildings.map((bu) => (
                                            <TouchableOpacity
                                                key={bu}
                                                onPress={() => {
                                                    setBuilding(bu);
                                                }}
                                                style={[
                                                    styles.category,
                                                    {
                                                        borderColor:
                                                            bu === building
                                                                ? primary
                                                                : dark,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.filterCampusText,
                                                        {
                                                            color:
                                                                bu === building
                                                                    ? primary
                                                                    : dark,
                                                        },
                                                    ]}
                                                >
                                                    {bu}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            </Dialog.Description>
                        </Dialog.Container>
                    </View>
                    <ScrollView style={styles.scroll}>
                        {data.map((room: RoomSlot, index: number) => {
                            return room.freeSlots.length === 0 &&
                                room.reservedSlots.length === 0 ? (
                                <View>
                                    <Text style={styles.noRoomsText}>
                                        There are no rooms to show
                                    </Text>
                                </View>
                            ) : (
                                <RoomListEntry
                                    room={room}
                                    delay={index * 10}
                                    key={room.room.id}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: light,
        flexGrow: 1,
        height: height,
        width: width,
    },
    container: {
        backgroundColor: light,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: "Poppins_700Bold",
        fontSize: 25,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        textAlign: "center",
        justifyContent: "center",
    },
    scroll: {
        width: width - 20,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: width,
        height: 50,
        paddingHorizontal: 20,
        marginBottom: 5,
        borderRadius: 10,
        boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.5)",
    },
    filterTitle: {
        fontFamily: "Poppins_700Bold",
        fontSize: 20,
    },
    filterCampus: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: 10,
        width: 300,
    },
    filterCampusText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 15,
        margin: 5,
        width: 60,
        textAlign: "center",
    },
    filterCampusLabel: {
        fontFamily: "Poppins_400Regular",
        fontSize: 15,
        margin: 5,
    },
    category: {
        margin: 3,
        borderRadius: 15,
        borderWidth: 2,
        padding: 5,
        paddingHorizontal: 10,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    noRoomsText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 20,
        color: dark,
        textAlign: "center",
        marginTop: "70%",
    },
});
