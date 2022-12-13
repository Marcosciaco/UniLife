import React from "react";
import { ImageBackground, View, Text } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";

type WeatherResponse = {
    Id: number;
    date: string;
    evolutiontitle: string;
    evolution: string;
    language: string;
    Stationdata: WeatherStationData[];
};

type WeatherStationData = {
    date: string;
    Id: number;
    CityName: string;
    WeatherCode: string;
    WeatherDesc: string;
    WeatherImgUrl: string;
    MinTemp: number;
    MaxTemp: number;
};

enum WeatherImage {
    Sunny = require("../assets/weather/Sunny.jpg"),
    Cloudy = require("../assets/weather/Cloudy.jpg"),
    Rainy = require("../assets/weather/Rainy.jpg"),
    Snowy = require("../assets/weather/Snowy.jpg"),
}

export default class WeatherAPIUtil {
    static async getWeatherforecast(): Promise<WeatherStationData> {
        const response = await fetch(
            "https://tourism.opendatahub.bz.it/v1/Weather?language=en&extended=true"
        );
        const json = await response.json();

        const weatherData = json as WeatherResponse;
        return await this.parseWeatherResponse(weatherData);
    }

    static async parseWeatherResponse(response: WeatherResponse) {
        return response.Stationdata.filter((station) => {
            return station.CityName === "Bolzano / Bozen";
        }).filter((station) => {
            return new Date(station.date).getDay() === new Date().getDay();
        })[0];
    }
}

export function getWeatherImage(weatherData: string) {
    weatherData = weatherData.toLowerCase();

    if (weatherData.includes("sun")) {
        return WeatherImage.Sunny;
    } else if (weatherData.includes("cloud")) {
        return WeatherImage.Cloudy;
    } else if (weatherData.includes("rain")) {
        return WeatherImage.Rainy;
    } else if (weatherData.includes("snow")) {
        return WeatherImage.Snowy;
    } else {
        return WeatherImage.Sunny;
    }
}

export function WeatherTempImage() {
    const [weatherData, setWeatherData] = React.useState<WeatherStationData>();
    const [weatherDesc, setWeatherDesc] = React.useState<string>("");

    React.useEffect(() => {
        WeatherAPIUtil.getWeatherforecast().then((data) => {
            setWeatherDesc(data.WeatherDesc);
            setWeatherData(data);
        });
    }, []);

    const img: WeatherImage = getWeatherImage(weatherDesc);

    return (
        <Animated.View entering={FadeInLeft.duration(400)}>
            <ImageBackground
                source={img}
                style={{
                    width: 120,
                    height: 120,
                    elevation: 1,
                    borderRadius: 15,
                    overflow: "hidden",
                }}
                imageStyle={{ borderRadius: 15 }}
            >
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "Poppins_200ExtraLight",
                            fontStyle: "normal",
                            fontSize: 55,
                            lineHeight: 120,
                            width: 120,
                            height: 120,
                            textAlign: "center",
                            alignItems: "center",
                            color: "#FFFFFF",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {weatherData?.MaxTemp}°
                    </Text>
                </View>
            </ImageBackground>
        </Animated.View>
    );
}
