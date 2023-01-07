import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
import { dark, height, primary, width } from "../utils/Theme";
import { LocationObject } from "expo-location";
import { User } from "../models/User";
import { getAllUsers } from "../utils/UserService";

export default function ToUniScreen({ navigation }: { navigation: any }) {
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
            <TouchableOpacity
                onPress={() => {
                    navigation.openDrawer();
                }}
                style={{
                    height: 30,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    alignSelf: "flex-end",
                    left: 20,
                    top: 40,
                    zIndex: 10,
                }}
            >
                <MenuIcon height={30} width={30} color={dark} />
            </TouchableOpacity>
            <View
                style={{
                    height: 30,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    alignSelf: "flex-end",
                    right: 20,
                    top: 40,
                    zIndex: 10,
                }}
            >
                <LogoIcon height={30} width={30} color={dark} />
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
                            >
                                <Image
                                    source={image}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        borderWidth: 2,
                                        borderColor: primary,
                                    }}
                                />
                            </Marker>
                        );
                    })}
                <Marker
                    coordinate={{
                        latitude: 46.4984534,
                        longitude: 11.3485215,
                    }}
                >
                    <Image
                        source={require("../assets/icons/pin.png")}
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
        height: height,
    },
});
