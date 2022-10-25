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
    WeatherDesc: boolean;
    WeatherImgUrl: string;
    MinTemp: string;
    Maxtemp: string;
    MaxTemp: string;
};

export default class WeatherAPIUtil {
    static async getWeatherforecast() {
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
