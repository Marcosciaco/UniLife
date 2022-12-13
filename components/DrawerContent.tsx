import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import {
    View,
    ImageBackground,
    Image,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";
import { auth } from "../utils/Firebase";
import { logout } from "../utils/UserService";

export function CustomDrawerContent(props: any, { navigation }: any) {
    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <ImageBackground
                    source={require("../assets/images/drawer-background.png")}
                    style={styles.profilePicBackground}
                >
                    <Image
                        source={{ uri: user?.photoURL }}
                        style={styles.profilePic}
                    />
                    <Text style={styles.profileName}>
                        {auth.currentUser?.displayName}
                    </Text>
                </ImageBackground>
                <Pressable onPress={() => logout(navigation)}>
                    <Text>Logout</Text>
                </Pressable>
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
