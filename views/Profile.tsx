import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import FollowIcon from "../assets/icons/follow";
import UnfollowIcon from "../assets/icons/unfollow";
import { User } from "../models/User";
import { auth } from "../utils/Firebase";
import { dark, light, primary, secondary, white } from "../utils/Theme";
import { followUser, getCurrentUser, unfollowUser } from "../utils/UserService";

export default function ProfileScreen({ user }: { user: User }): JSX.Element {
    const [followers, setFollowers] = useState<number>();
    const [following, setFollowing] = useState<number>();
    const [isFollowing, setIsFollowing] = useState<boolean>();

    const toggle = () => {
        if (isFollowing && user.email != null) {
            unfollowUser(user.email);
            setIsFollowing(false);
        } else {
            if (user.email != null) {
                followUser(user.email);
                setIsFollowing(true);
            }
        }
    };

    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            if (currentUser != null) {
                if (currentUser.following?.includes(user.email || "")) {
                    setIsFollowing(true);
                }
            }
        });
    }, [user]);

    useEffect(() => {
        setFollowers(
            user.followers?.split(";").filter((x) => x != "").length || 0
        );
        setFollowing(
            user.following?.split(";").filter((x) => x != "").length || 0
        );
    }, [user]);

    return (
        <View style={styles.container}>
            <ExpoStatusBar backgroundColor="transparent" style="dark" />
            <ImageBackground
                style={styles.backgroundImage}
                source={{
                    uri: user.photoURL || "https://picsum.photos/1920/1080",
                }}
            >
                <View></View>
                <View style={styles.dataContainer}>
                    <View style={styles.profileHeader}>
                        <Text style={styles.title}>{user.displayName}</Text>
                        <View style={styles.followButton}>
                            {user.email == auth.currentUser?.email ? (
                                <></>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => toggle()}
                                    style={styles.followButton}
                                >
                                    {isFollowing ? (
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
                    </View>
                    <View style={styles.descriptionRow}>
                        <View style={styles.descriptionEntry}>
                            <Text style={styles.subtitle}>Followers</Text>
                            <Text style={styles.subtitle}>{followers}</Text>
                        </View>
                        <View style={styles.descriptionEntry}>
                            <Text style={styles.subtitle}>Following</Text>
                            <Text style={styles.subtitle}>{following}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    title: {
        fontFamily: "Poppins_400Regular",
        color: secondary,
        fontSize: 24,
        marginLeft: 20,
    },
    subtitle: {
        color: white,
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        marginLeft: 20,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "space-between",
        marginTop: -25,
    },
    dataContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: dark,
        padding: 20,
    },
    profileHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    descriptionRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 20,
    },
    descriptionEntry: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    followButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        margin: 10,
        backgroundColor: light,
    },
});
