import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import CloseIcon from "../../assets/icons/close";
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

export default function UserEntry({ user }: { user: User }) {
    const [following, setFollowing] = useState<boolean>(false);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);

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
                            <UnfollowIcon height={20} width={20} color={dark} />
                        ) : (
                            <FollowIcon height={20} width={20} color={dark} />
                        )}
                    </TouchableOpacity>
                )}
            </View>
            <Dialog.Container
                visible={dialogVisible}
                contentStyle={{
                    backgroundColor: light,
                    borderRadius: 10,
                    margin: 0,
                    padding: 0,
                    height: height - 80,
                }}
                onBackdropPress={() => setDialogVisible(false)}
            >
                <View style={styles.dialogHeader}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setDialogVisible(false)}
                    >
                        <CloseIcon height={25} width={25} color={dark} />
                    </TouchableOpacity>
                </View>
                <ProfileScreen user={user}></ProfileScreen>
            </Dialog.Container>
        </TouchableOpacity>
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
    dialogHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: dark,
        height: 50,
        width: width - 40,
        marginTop: -25,
        elevation: 5,
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: light,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
});
