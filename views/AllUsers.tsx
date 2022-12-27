import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Pressable,
    Image,
    ScrollView,
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
                {users.map((user: any) => {
                    return (
                        <View style={styles.userContainer} key={user.uid}>
                            <Image style={styles.imageContainer} source={{uri: user.photoURL}} />
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
    safeAreaView: {
        backgroundColor: "#FBFDFF",
        paddingTop: StatusBar.currentHeight,
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
