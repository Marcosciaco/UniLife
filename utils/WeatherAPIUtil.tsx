import { WeatherImage } from "../models/WeatherImage";
import { WeatherResponse } from "../models/WeatherResponse";
import { WeatherStationData } from "../models/WeatherStationData";

export function getWeatherforecast(): Promise<WeatherStationData> {
    return new Promise((resolve, reject) => {
        fetch(
            "https://tourism.opendatahub.bz.it/v1/Weather?language=en&extended=true"
        )
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const weatherData = json as WeatherResponse;
                resolve(parseWeatherResponse(weatherData));
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function parseWeatherResponse(
    response: WeatherResponse
): WeatherStationData {
    return response.Stationdata.filter((station) => {
        return station.CityName === "Bolzano / Bozen";
    }).filter((station) => {
        return new Date(station.date).getDay() === new Date().getDay();
    })[0];
}

export function getWeatherImage(weatherData: string): WeatherImage {
    weatherData = weatherData.toLowerCase();

    if (weatherData.includes("sun")) {
        return WeatherImage.Sunny;
    } else if (weatherData.includes("cloud")) {
        return WeatherImage.Cloudy;
    } else if (weatherData.includes("rain")) {
        return WeatherImage.Rainy;
    } else if (weatherData.includes("snow")) {
        return WeatherImage.Snowy;
    } else if (weatherData.includes("dull")) {
        return WeatherImage.Dull;
    } else {
        return WeatherImage.Sunny;
    }
}
