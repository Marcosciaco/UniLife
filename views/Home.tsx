import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import HeaderRow from "../components/Home/HomeHeaderComponent";
import showToast from "../components/Inputs/Toast";
import NotificationContainer from "../components/Home/NotificationContainerComponent";
import HomeMapView from "../components/Home/HomeMapViewComponent";
import { CategoryCode } from "../models/CategoryCode";
import { GastronomyResponse } from "../models/GastronomyResponse";
import { auth } from "../utils/Firebase";
import { getGastronomyLocales } from "../utils/GastronomyAPIUtil";
import { light, white } from "../utils/Theme";
import { getAllUsers, updateUserLocation } from "../utils/UserService";
import { getWeatherforecast } from "../utils/WeatherAPIUtil";
import { WeatherTempImage } from "../components/Home/WeatherTempImage";
import { User } from "../models/User";

export default function HomeScreen({ navigation }: any): JSX.Element {
    const [weatherData, setWeatherData] = useState<string>("");
    const [location, setLocation] = useState<LocationObject>();
    const [restaurants, setRestaurants] = useState<GastronomyResponse[]>([]);
    const [username, setUsername] = useState<string>("");
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        getAllUsers()
            .then((users) => {
                setUsers(users);
            })
            .catch((error) => {
                showToast("Error while fetching users", error);
            });
    }, []);

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigation.navigate("Login" as never);
            } else {
                setUsername(user.displayName as string);
            }
        });
    }, []);

    React.useEffect(() => {
        getWeatherforecast()
            .then((data) => {
                setWeatherData(data.WeatherDesc);
            })
            .catch((error) => {
                showToast("Error while fetching weather data", error);
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
            )
                .then((data) => {
                    setRestaurants(data);
                })
                .catch((error) => {
                    showToast("Error while fetching restaurants", error);
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
                    <HomeMapView
                        location={location}
                        restaurants={restaurants}
                        users={users}
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
