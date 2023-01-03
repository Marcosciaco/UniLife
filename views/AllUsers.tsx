import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Pressable,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
import { User } from "../models/User";
import { getAllUsers } from "../utils/UserService";

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

    const Users = () => {
        return (
            <View>
                {filtered.map((user: any) => {
                    return (
                        <View style={styles.userContainer} key={user.uid}>
                            <Image
                                style={styles.imageContainer}
                                source={{ uri: user.photoURL }}
                            />
                            <Text style={styles.text}>{user.displayName}</Text>
                            <FollowButton onPress={() => null} />
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <TouchableHighlight
                    underlayColor="#FBFDFF"
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    <MenuIcon color="#2B363F" height={30} width={30} />
                </TouchableHighlight>
                <TextInput
                    onChangeText={(text) => {
                        console.log(text);
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
                <LogoIcon color="#2B363F" height={40} width={40} />
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <Users></Users>
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
        backgroundColor: "#fff",
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
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        paddingLeft: 10,
        width: width - 120,
    },
    safeAreaView: {
        backgroundColor: "#FBFDFF",
        flexGrow: 1,
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
    userContainer: {
        width: width - 20,
        padding: 5,
        flexDirection: "row",
        borderRadius: 15,
        marginTop: 10,
        alignItems: "center",
        backgroundColor: "#dfeeff",
    },
    imageContainer: {
        width: 75,
        height: 75,
        borderWidth: 2,
        borderColor: "#7b9fd1",
        borderRadius: 15,
        margin: 3,
        marginRight: 10,
    },
    text: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: "#636364",
    },
    button: {
        alignItems: "center",
        marginLeft: "auto",
        width: 80,
        borderRadius: 10,
        margin: 15,
        padding: 5,
        borderColor: "#7b9fd1",
        borderWidth: 1,
        backgroundColor: "#fff",
        fontFamily: "Poppins_400Regular",
    },
});
