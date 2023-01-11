import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
import { User } from "../models/User";
import { height, light, primary, width } from "../utils/Theme";
import { getAllUsers } from "../utils/UserService";

export default function ToUniScreen({
    navigation,
}: {
    navigation: any;
}): JSX.Element {
    const [location, setLocation] = React.useState<LocationObject>();
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users);
        });
    }, []);

    React.useEffect(() => {
        (async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <ExpoStatusBar backgroundColor="transparent" style="light" />
            <TouchableOpacity
                onPress={() => {
                    navigation.openDrawer();
                }}
                style={styles.menuButton}
            >
                <MenuIcon height={30} width={30} color={light} />
            </TouchableOpacity>
            <View style={styles.logo}>
                <LogoIcon height={30} width={30} color={light} />
            </View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                mapType="satellite"
                region={{
                    latitude: location?.coords.latitude || 0,
                    longitude: location?.coords.longitude || 0,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
            >
                {users
                    .filter((u) => u.locationTracking)
                    .map((user) => {
                        let image = require("../assets/icons/pin.png");
                        if (user.photoURL) {
                            image = { uri: user.photoURL };
                        }
                        return (
                            <Marker
                                key={user.email}
                                coordinate={{
                                    latitude:
                                        user.location?.coords.latitude || 0,
                                    longitude:
                                        user.location?.coords.longitude || 0,
                                }}
                                style={styles.marker}
                            >
                                <Image
                                    source={image}
                                    style={styles.markerImage}
                                />
                            </Marker>
                        );
                    })}
                <Marker
                    coordinate={{
                        latitude: 46.49808727424795,
                        longitude: 11.350095502920437,
                    }}
                >
                    <Image
                        source={require("../assets/images/unibz_logo.png")}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            borderWidth: 2,
                            borderColor: primary,
                        }}
                    />
                </Marker>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: width,
        height: height + 80,
        marginTop: -40,
    },
    menuButton: {
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        alignSelf: "flex-end",
        left: 20,
        top: 40,
        zIndex: 10,
    },
    logo: {
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        alignSelf: "flex-end",
        right: 20,
        top: 40,
        zIndex: 10,
    },
    markerImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: primary,
    },
    marker: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});
