type WeatherResponse = {
    id: number;
    date: string;
    evolutiontitle: string;
    evolution: string;
    language: string;
    Stationdata: WeatherStationData[];
};

type WeatherStationData = {
    date: string;
    Id: string;
    CityName: string;
    WeatherCode: boolean;
    WeatherDesc: string;
    WeatherImgUrl: string;
    MinTemp: string;
    Maxtemp: string;
    MaxTemp: string;
};

enum WheatherImage {
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
    switch (weatherData) {
        case "Sunny":
            return WheatherImage.Sunny;
        case "Cloudy":
            return WheatherImage.Cloudy;
        case "Rainy":
            return WheatherImage.Rainy;
        case "Snowy":
            return WheatherImage.Snowy;
        default:
            return WheatherImage.Cloudy;
    }
}
