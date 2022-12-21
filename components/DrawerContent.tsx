import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import LogoutIcon from "../assets/icons/logout";
import { auth } from "../utils/Firebase";

export function CustomDrawerContent({ ...props }: any) {
    const [user, setUser] = React.useState<any>(null);
    const navigation = useNavigation();

    const filteredProps = {
        ...props,
        state: {
            ...props.state,
            routeNames: props.state.routeNames.filter((routeName: string) => {
                routeName !== "Login";
            }),
            routes: props.state.routes.filter(
                (route: any) => route.name !== "Login"
            ),
        },
    };

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
            <DrawerContentScrollView {...filteredProps}>
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
                        <Pressable onPress={logout} style={styles.logout}>
                            <LogoutIcon
                                height={20}
                                width={20}
                                color="#2B363F"
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.drawerContent}>
                    <DrawerItemList {...filteredProps} />
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
        backgroundColor: "#AECFFF",
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
        color: "#fff",
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
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
});
