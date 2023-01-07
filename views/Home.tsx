import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import HeaderRow from "../components/HomeHeaderComponent";
import NotificationContainer from "../components/NotificationContainerComponent";
import RestaurantMapView from "../components/RestaurantMapViewComponent";
import { CategoryCode } from "../models/CategoryCode";
import { auth } from "../utils/Firebase";
import {
    GastronomyResponse,
    getGastronomyLocales,
} from "../utils/GastronomyAPIUtil";
import { light, white } from "../utils/Theme";
import { updateUserLocation } from "../utils/UserService";
import WeatherAPIUtil, { WeatherTempImage } from "../utils/WeatherAPIUtil";

export default function HomeScreen({ navigation }: any) {
    const [weatherData, setWeatherData] = React.useState("");
    const [location, setLocation] = useState<LocationObject>();
    const [restaurants, setRestaurants] = useState<GastronomyResponse[]>([]);
    const [username, setUsername] = useState<string>("");

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigation.navigate("Login" as never);
            }
        });
    }, []);

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsername(user.displayName as string);
            }
        });
    }, []);

    React.useEffect(() => {
        WeatherAPIUtil.getWeatherforecast().then((data) => {
            setWeatherData(data.WeatherDesc);
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
            updateUserLocation(auth.currentUser?.email as string, location);
        })();
    }, []);

    React.useEffect(() => {
        if (location) {
            getGastronomyLocales(
                CategoryCode.CAFE,
                location?.coords.latitude,
                location?.coords.longitude,
                10000
            ).then((data) => {
                setRestaurants(data);
            });
        }
    }, [location]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ExpoStatusBar backgroundColor="transparent" style="dark" />
            <HeaderRow navigation={navigation} />
            <View style={styles.weatherRowContainer}>
                <WeatherTempImage></WeatherTempImage>
                <Animated.View
                    entering={FadeInLeft.duration(400)}
                    style={styles.weatherDescriptionContainer}
                >
                    <Text style={styles.weatherDescriptionText}>
                        Hi {username} 👋{"\n"}It's a {weatherData} day
                    </Text>
                </Animated.View>
            </View>
            <NotificationContainer />
            <Animated.View
                entering={FadeInLeft.delay(800).duration(400)}
                style={styles.mapContainerRow}
            >
                <View style={styles.mapContainer}>
                    <RestaurantMapView
                        location={location}
                        restaurants={restaurants}
                    />
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: light,
        paddingTop: 20,
        flexGrow: 1,
    },

    weatherRowContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 20,
        overflow: "hidden",
    },

    weatherDescriptionContainer: {
        height: 120,
        marginLeft: 20,
        flex: 1,
    },

    weatherDescriptionText: {
        fontFamily: "Poppins_600SemiBold",
        height: 120,
        padding: 20,
        textAlign: "left",
        borderRadius: 15,
        textAlignVertical: "center",
        backgroundColor: white,
    },

    mapContainerRow: {
        overflow: "hidden",
        padding: 20,
        flexGrow: 1,
    },

    mapContainer: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: white,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
});
