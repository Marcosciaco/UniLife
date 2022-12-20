import React from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import RoomListEntry from "../components/RoomListEntry";
import { RoomSlot } from "../models/RoomSlot";

export default function RoomsScreen({ navigation }: any) {
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        const response = await fetch(
            "https://europe-west1-unibz-room-finder.cloudfunctions.net/roomsTimeSlots"
        );

        const data = await response.json();
        const da = data.data as RoomSlot[];

        da.forEach((room) => {
            room.room.id =
                room.room.campus + "_" + room.room.building + room.room.name;
        });

        setData(data.data);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.title}>Rooms</Text>
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
        backgroundColor: "#FBFDFF",
        paddingTop: StatusBar.currentHeight,
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#FBFDFF",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    scroll: {
        flex: 1,
        width: "100%",
    },
});
