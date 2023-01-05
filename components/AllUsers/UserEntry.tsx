import { useEffect, useState } from "react";
import {
    Pressable,
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import { light, dark, secondary, white, primary } from "../../utils/Theme";
import { followUser } from "../../utils/UserService";

const { width } = Dimensions.get("window");

export default function UserEntry({ user }: any) {
    const [following, setFollowing] = useState<boolean>(false);
    const [followers, setFollowers] = useState<any[]>([]);

    useEffect(() => {
        setFollowers(user.followers);
    }, []);

    const buttonText = following ? "Unfollow" : "Follow";

    const toggle = () => {
        followUser(user.email);
        setFollowing(!following);
    };

    return (
        <View style={styles.userContainer} key={user.uid}>
            <Image
                style={styles.imageContainer}
                source={{ uri: user.photoURL }}
            />
            <Text style={styles.text}>{user.displayName}</Text>
            <Pressable style={styles.button} onPress={() => toggle()}>
                <Text style={styles.text}>{buttonText}</Text>
            </Pressable>
        </View>
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
    imageContainer: {
        width: 75,
        height: 75,
        borderWidth: 2,
        borderColor: primary,
        borderRadius: 15,
        margin: 3,
        marginRight: 10,
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
