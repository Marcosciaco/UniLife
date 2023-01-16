import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { User as FirebaseUser } from "firebase/auth";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LogoutIcon from "../../assets/icons/logout";
import { User } from "../../models/User";
import { auth } from "../../utils/Firebase";
import { dark, secondary, white } from "../../utils/Theme";
import { getCurrentUser } from "../../utils/UserService";
import showToast from "../Inputs/Toast";

export function CustomDrawerContent({ ...props }: any): JSX.Element {
    const [user, setUser] = React.useState<User>();
    const navigation = useNavigation();

    React.useEffect(() => {
        auth.onAuthStateChanged((user: FirebaseUser | null) => {
            if (user) {
                getCurrentUser()
                    .then((cUser) => {
                        setUser(cUser);
                    })
                    .catch((error) => {
                        showToast(error.message, error);
                    });
            }
        });
    }, []);

    const logout = (): void => {
        auth.signOut()
            .then(() => {
                navigation.navigate("Login" as never);
            })
            .catch((error) => {
                showToast(error.message, error);
            });
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <View>
                        <Image
                            source={{
                                uri:
                                    user?.photoURL ||
                                    "../../assets/images/user_placeholder.png",
                            }}
                            style={styles.profilePic}
                        />
                        <Text style={styles.profileName}>
                            {auth.currentUser?.displayName}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={logout}
                            style={styles.logout}
                        >
                            <LogoutIcon height={20} width={20} color={dark} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.drawerContent}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: secondary,
        paddingTop: 10,
        paddingLeft: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    profilePicBackground: {
        padding: 20,
    },
    profilePic: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        color: dark,
        fontSize: 18,
        fontFamily: "Poppins_300Light",
        marginBottom: 5,
    },
    drawerContent: {
        flex: 1,
        paddingTop: 10,
        height: "100%",
    },
    logout: {
        backgroundColor: white,
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
});
