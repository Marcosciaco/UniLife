import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../models/User";
import { getAllUsers } from "../utils/UserService";

const { width } = Dimensions.get("window");

export default function AllUsersScreen({ navigation }: any) {
    const [users, setUsers] = React.useState<User[]>([]);
    React.useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users);
        });
    }, []);

    const Users = () => {
        return (
            <View>
                {users.map((user) => {
                    return (
                        <View key={user.uid}>
                            <Text>{user.email}</Text>
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Users></Users>
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
