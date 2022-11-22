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

export default function HomeScreen({ navigation }: any) {
    const [weatherData, setWeatherData] = React.useState("");
    const [location, setLocation] = useState<LocationObject>();
    const [restaurants, setRestaurants] = useState<GastronomyResponse[]>([]);

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
            <ExpoStatusBar backgroundColor="#FBFDFF" style="dark" />
            <HeaderRow navigation={navigation} />
            <View style={styles.weatherRowContainer}>
                <WeatherTempImage></WeatherTempImage>
                <View style={styles.weatherDescriptionContainer}>
                    <Text style={styles.weatherDescriptionText}>
                        Hi Marco 👋{"\n"}It's a {weatherData} day
                    </Text>
                </View>
            </View>
            <NotificationContainer />
            <View style={styles.mapContainerRow}>
                <View style={styles.mapContainer}>
                    <RestaurantMapView
                        location={location}
                        restaurants={restaurants}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: "#FBFDFF",
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
        backgroundColor: "#F3F8FF",
    },

    mapContainerRow: {
        overflow: "hidden",
        padding: 20,
        flexGrow: 1,
    },

    mapContainer: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#F3F8FF",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
});
