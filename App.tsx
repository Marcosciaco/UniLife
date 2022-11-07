import React from "react";
import { StyleSheet, View, Image } from "react-native";
import WeatherAPIUtil, { getWeatherImage } from "./utils/WeatherAPIUtil";

export default function App() {
    const [weatherData, setWeatherData] = React.useState("");
    const ret = WeatherAPIUtil.getWeatherforecast();

    ret.then((value) => {
        setWeatherData(value.WeatherDesc);
    });

    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={getWeatherImage(weatherData)}
            />
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
    tinyLogo: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});
