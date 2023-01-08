import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
import UserEntry from "../components/AllUsers/UserEntry";
import { User } from "../models/User";
import { dark, light, width } from "../utils/Theme";
import { getAllUsers } from "../utils/UserService";

export default function AllUsersScreen({ navigation }: any): JSX.Element {
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
            <ExpoStatusBar backgroundColor="transparent" style="dark" />
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
});
