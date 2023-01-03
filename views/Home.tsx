import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import WeatherAPIUtil, { WeatherTempImage } from "../utils/WeatherAPIUtil";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import GastronomyAPIUtil, {
    GastronomyResponse,
} from "../utils/GastronomyAPIUtil";
import { CategoryCode } from "../models/CategoryCode";
import HeaderRow from "../components/HomeHeaderComponent";
import NotificationContainer from "../components/NotificationContainerComponent";
import RestaurantMapView from "../components/RestaurantMapViewComponent";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { auth } from "../utils/Firebase";
import { light, white } from "../utils/Theme";

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
        if (auth.currentUser?.displayName) {
            setUsername(auth.currentUser?.displayName);
        }
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
        })();
    }, []);

    React.useEffect(() => {
        if (location) {
            GastronomyAPIUtil.getGastronomyLocales(
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
        paddingTop: StatusBar.currentHeight,
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
