import { WeatherStationData } from "./WeatherStationData";

export type WeatherResponse = {
    Id: number;
    date: string;
    evolutiontitle: string;
    evolution: string;
    language: string;
    Stationdata: WeatherStationData[];
};
