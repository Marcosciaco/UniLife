import React from "react";
import {
    FlatList,
    Pressable, StyleSheet, Text, View
} from "react-native";
import Dialog from "react-native-dialog";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterIcon from "../assets/icons/filter";
import MenuIcon from "../assets/icons/menu";
import RoomListEntry from "../components/RoomListEntry";
import { RoomSlot } from "../models/RoomSlot";
import { dark, light, primary, width } from "../utils/Theme";

export default function RoomsScreen({ navigation }: any) {
    const [data, setData] = React.useState([]);
    const [notFilteredData, setNotFilteredData] = React.useState([]);

    const [visible, setVisible] = React.useState(false);

    const [campus, setCampus] = React.useState("All");
    const [campuses, setCampuses] = React.useState<string[]>([]);

    const [available, setAvailable] = React.useState(true);

    const [building, setBuilding] = React.useState("All");
    const [buildings, setBuildings] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (campus === "All" && building === "All") {
            setData(notFilteredData);
        } else if (campus !== "All" && building === "All") {
            setData(
                notFilteredData.filter(
                    (room: RoomSlot) => room.room.campus === campus
                )
            );
        } else if (campus === "All" && building !== "All") {
            setData(
                notFilteredData.filter(
                    (room: RoomSlot) => room.room.building === building
                )
            );
        } else {
            setData(
                notFilteredData.filter(
                    (room: RoomSlot) =>
                        room.room.campus === campus &&
                        room.room.building === building
                )
            );
        }
    }, [campus, building]);

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
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                    >
                        <MenuIcon height={30} width={30} color={dark} />
                    </Pressable>
                    <Text style={styles.title}>Rooms</Text>
                    <Pressable onPress={() => setVisible(true)}>
                        <FilterIcon height={30} width={30} color={dark} />
                    </Pressable>
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
                                <Text style={styles.filterCampusText}>
                                    Only available Rooms?
                                </Text>
                                <View style={styles.filterCampus}>
                                    <Pressable
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
                                        <Text style={styles.filterCampusText}>
                                            Yes
                                        </Text>
                                    </Pressable>
                                    <Pressable
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
                                        <Text style={styles.filterCampusText}>
                                            No
                                        </Text>
                                    </Pressable>
                                </View>
                                <Text style={styles.filterCampusText}>
                                    Campus
                                </Text>
                                <View style={styles.filterCampus}>
                                    {campuses.map((ca) => (
                                        <Pressable
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
                                        </Pressable>
                                    ))}
                                </View>
                                <Text style={styles.filterCampusText}>
                                    Building
                                </Text>
                                <View style={styles.filterCampus}>
                                    {buildings.map((bu) => (
                                        <Pressable
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
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        </Dialog.Description>
                    </Dialog.Container>
                </View>
                <FlatList
                    renderItem={({ item }) => (
                        <RoomListEntry room={item} delay={0} />
                    )}
                    data={data}
                    keyExtractor={(item: RoomSlot) => item.room.id}
                    style={styles.scroll}
                ></FlatList>
            </View>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: light,
        flexGrow: 1,
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
        flex: 1,
        width: "100%",
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
        width: 350,
    },
    filterCampusText: {
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
});
