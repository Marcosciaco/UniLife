import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { View, ImageBackground, Image, Text, StyleSheet } from "react-native";

export function CustomDrawerContent(props: any) {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <ImageBackground
                    source={require("../assets/images/drawer-background.png")}
                    style={styles.profilePicBackground}
                >
                    <Image
                        source={require("../assets/images/user-profile.jpg")}
                        style={styles.profilePic}
                    />
                    <Text style={styles.profileName}>John Doe</Text>
                </ImageBackground>
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
});
