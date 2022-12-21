import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterIcon from "../assets/icons/filter";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
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
                <View style={styles.header}>
                    <Pressable
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                    >
                        <MenuIcon height={30} width={30} color="#2B363F" />
                    </Pressable>
                    <Text style={styles.title}>Rooms</Text>
                    <Pressable>
                        <FilterIcon height={30} width={30} color="#2B363F" />
                    </Pressable>
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
        fontFamily: "Poppins_700Bold",
        fontSize: 30,
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
        width: "90%",
        height: 50,
        padding: 5,
        marginBottom: 5,
        borderRadius: 10,
        boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.5)",
    },
});
