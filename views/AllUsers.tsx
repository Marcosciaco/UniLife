import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
import UserEntry from "../components/AllUsers/UserEntry";
import { User } from "../models/User";
import { dark, light, primary, secondary, white } from "../utils/Theme";
import { followUser, getAllUsers, getCurrentUser } from "../utils/UserService";

const { width } = Dimensions.get("window");

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
                <TouchableHighlight
                    underlayColor={white}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    <MenuIcon color={dark} height={30} width={30} />
                </TouchableHighlight>
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
            <ScrollView>
                <View style={styles.container}>
                    {users.map((user: User) => {
                        return (
                            <UserEntry key={user.email} user={user}></UserEntry>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export function FollowButton(props: any) {
    const { onPress } = props;
    const [following, setFollowing] = useState<boolean>(false);

    const buttonText = following ? "Unfollow" : "Follow";

    const toggle = () => {
        onPress();
        setFollowing(!following);
    };
    return (
        <Pressable style={styles.button} onPress={toggle}>
            <Text style={styles.text}>{buttonText}</Text>
        </Pressable>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: light,
        alignItems: "center",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    input: {
        fontFamily: "Poppins_400Regular",
        height: 40,
        borderColor: dark,
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        paddingLeft: 10,
        width: width - 120,
    },
    safeAreaView: {
        backgroundColor: light,
        flexGrow: 1,
    },
    iconContainer: {
        backgroundColor: light,
        height: 50,
        width: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    event: {
        height: 80,
        width: width - 40,
        backgroundColor: secondary,
        borderRadius: 15,
        margin: 20,
        marginBottom: 0,
    },
    userContainer: {
        width: width - 20,
        padding: 5,
        flexDirection: "row",
        borderRadius: 15,
        marginTop: 10,
        alignItems: "center",
        backgroundColor: white,
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
