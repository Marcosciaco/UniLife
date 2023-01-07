import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import LogoutIcon from "../assets/icons/logout";
import { auth } from "../utils/Firebase";
import { dark, secondary, white } from "../utils/Theme";

export function CustomDrawerContent({ ...props }: any) {
    const [user, setUser] = React.useState<any>(null);
    const navigation = useNavigation();

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    const logout = () => {
        auth.signOut().then(() => {
            navigation.navigate("Login" as never);
        });
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <View>
                        <Image
                            source={{ uri: user?.photoURL }}
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
