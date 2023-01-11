import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import Animated, { FadeInLeft } from "react-native-reanimated";
import FollowIcon from "../../assets/icons/follow";
import UnfollowIcon from "../../assets/icons/unfollow";
import { User } from "../../models/User";
import { auth } from "../../utils/Firebase";
import { dark, height, light, white, width } from "../../utils/Theme";
import {
    followUser,
    getCurrentUser,
    unfollowUser,
} from "../../utils/UserService";
import ProfileScreen from "../../views/Profile";

export default function UserEntry({
    user,
    delay,
}: {
    user: User;
    delay: number;
}): JSX.Element {
    const [following, setFollowing] = useState<boolean>();
    const [dialogVisible, setDialogVisible] = useState<boolean>();

    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            if (currentUser != null) {
                if (user.email && currentUser.following?.includes(user.email)) {
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
        <Animated.View entering={FadeInLeft.delay(delay)}>
            <View>
                <TouchableOpacity
                    style={styles.userContainer}
                    key={user.uid}
                    onPress={() => setDialogVisible(true)}
                >
                    <Image
                        style={styles.imageContainer}
                        source={{ uri: user.photoURL || "" }}
                    />
                    <Text style={styles.text}>{user.displayName}</Text>
                    <View style={styles.followButton}>
                        {user.email == auth.currentUser?.email ? (
                            <></>
                        ) : (
                            <TouchableOpacity
                                style={styles.buttonIcon}
                                onPress={() => toggle()}
                            >
                                {following ? (
                                    <UnfollowIcon
                                        height={20}
                                        width={20}
                                        color={dark}
                                    />
                                ) : (
                                    <FollowIcon
                                        height={20}
                                        width={20}
                                        color={dark}
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                    <Dialog.Container
                        visible={dialogVisible}
                        contentStyle={styles.userDetailContainer}
                        onBackdropPress={() => setDialogVisible(false)}
                    >
                        <ProfileScreen user={user}></ProfileScreen>
                    </Dialog.Container>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: light,
        alignItems: "center",
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
    buttonIcon: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: light,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins_400Regular",
    },
    followButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    userDetailContainer: {
        backgroundColor: light,
        borderRadius: 10,
        margin: 0,
        padding: 0,
        height: height - 80,
    },
});
