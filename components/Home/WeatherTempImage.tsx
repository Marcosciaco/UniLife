import React from "react";
import { useEffect } from "react";
import { ImageBackground, View, Text, StyleSheet } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { WeatherImage } from "../../models/WeatherImage";
import { WeatherStationData } from "../../models/WeatherStationData";
import { white } from "../../utils/Theme";
import {
    getWeatherforecast,
    getWeatherImage,
} from "../../utils/WeatherAPIUtil";

export function WeatherTempImage(): JSX.Element {
    const [weatherData, setWeatherData] = React.useState<WeatherStationData>();
    const [weatherDesc, setWeatherDesc] = React.useState<string>("");

    useEffect(() => {
        getWeatherforecast().then((data) => {
            setWeatherDesc(data.WeatherDesc);
            setWeatherData(data);
        });
    }, []);

    const img: WeatherImage = getWeatherImage(weatherDesc);

    return (
        <Animated.View entering={FadeInLeft.duration(400)}>
            <ImageBackground
                source={img}
                style={styles.weatherImage}
                imageStyle={{ borderRadius: 15 }}
            >
                <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>
                        {weatherData?.MaxTemp}°
                    </Text>
                </View>
            </ImageBackground>
        </Animated.View>
    );
}

export const styles = StyleSheet.create({
    weatherImage: {
        width: 120,
        height: 120,
        elevation: 1,
        borderRadius: 15,
        overflow: "hidden",
    },
    temperatureContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    temperature: {
        fontFamily: "Poppins_200ExtraLight",
        fontStyle: "normal",
        fontSize: 55,
        lineHeight: 120,
        width: 120,
        height: 120,
        textAlign: "center",
        alignItems: "center",
        color: white,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
});
