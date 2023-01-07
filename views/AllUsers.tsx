import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
import UserEntry from "../components/AllUsers/UserEntry";
import { User } from "../models/User";
import { dark, light, primary, white, width } from "../utils/Theme";
import { getAllUsers } from "../utils/UserService";

export default function AllUsersScreen({ navigation }: any) {
    const [users, setUsers] = React.useState<User[]>([]);
    const [filtered, setFiltered] = React.useState<User[]>([]);
    React.useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users);
            setFiltered(users);
        });
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    <MenuIcon color={dark} height={30} width={30} />
                </TouchableOpacity>
                <TextInput
                    onChangeText={(text) => {
                        setFiltered(
                            users.filter((user: User) =>
                                user.displayName
                                    ?.toLowerCase()
                                    .includes(text.toLowerCase())
                            )
                        );
                    }}
                    placeholder="Search"
                    style={styles.input}
                ></TextInput>
                <LogoIcon color={dark} height={40} width={40} />
            </View>
            <FlatList
                data={filtered}
                style={styles.container}
                renderItem={({ item, index }) => {
                    return (
                        <UserEntry user={item} delay={index * 100}></UserEntry>
                    );
                }}
                keyExtractor={(user) => {
                    return user.email || "";
                }}
            ></FlatList>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: light,
        marginLeft: 10,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    input: {
        fontFamily: "Poppins_400Regular",
        height: 40,
        borderColor: dark,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        width: width - 160,
    },
    safeAreaView: {
        backgroundColor: light,
        flexGrow: 1,
    },
    text: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: dark,
    },
    button: {
        alignItems: "center",
        marginLeft: "auto",
        width: 80,
        borderRadius: 10,
        margin: 15,
        padding: 5,
        borderColor: primary,
        borderWidth: 2,
        backgroundColor: white,
        fontFamily: "Poppins_400Regular",
    },
});
