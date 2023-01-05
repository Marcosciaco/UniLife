import { useEffect, useState } from "react";
import {
    Pressable,
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import FollowIcon from "../../assets/icons/follow";
import UnfollowIcon from "../../assets/icons/unfollow";
import { User } from "../../models/User";
import { auth } from "../../utils/Firebase";
import { light, dark, secondary, white, primary } from "../../utils/Theme";
import {
    followUser,
    getCurrentUser,
    unfollowUser,
} from "../../utils/UserService";

const { width } = Dimensions.get("window");

export default function UserEntry({ user }: { user: User }) {
    const [following, setFollowing] = useState<boolean>(false);

    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            if (currentUser != null) {
                if (currentUser.following?.includes(user.email || "")) {
                    setFollowing(true);
                }
            }
        });
    }, []);

    const toggle = () => {
        if (following && user.email != null) {
            unfollowUser(user.email);
            setFollowing(false);
        } else {
            if (user.email != null) {
                followUser(user.email);
                setFollowing(true);
            }
        }
    };

    return (
        <View style={styles.userContainer} key={user.uid}>
            <Image
                style={styles.imageContainer}
                source={{ uri: user.photoURL || "" }}
            />
            <Text style={styles.text}>{user.displayName}</Text>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    height: "100%",
                }}
            >
                {user.email == auth.currentUser?.email ? (
                    <></>
                ) : (
                    <Pressable style={styles.button} onPress={() => toggle()}>
                        {following ? (
                            <UnfollowIcon height={15} width={15} color={dark} />
                        ) : (
                            <FollowIcon height={15} width={15} color={dark} />
                        )}
                    </Pressable>
                )}
            </View>
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
        padding: 5,
        display: "flex",
        flexDirection: "row",
        width: width - 20,
        justifyContent: "space-between",
        borderRadius: 15,
        marginBottom: 10,
        alignItems: "center",
        backgroundColor: white,
    },
    imageContainer: {
        width: 75,
        height: 75,
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
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: light,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins_400Regular",
    },
});
