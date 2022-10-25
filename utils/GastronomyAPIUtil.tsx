import { CategoryCode } from "../models/CategoryCode";

export type GastronomyResponse = {
    Altitude: number;
    Detail: {
        de: string;
        en: string;
        it: string;
    };
    GpsPoints: {
        position: {
            Latitude: number;
            Logitude: number;
        };
    };
    ImageGallery: {
        Width: number;
        Height: number;
        ImageUrl: string;
    }[];
    Shortname: string;
};

export default class GastronomyAPIUtil {
    static async getGastronomyLocales(
        code: CategoryCode,
        latitude: number,
        longitude: number,
        radius: number
    ) {
        const response = await fetch(
            `https://tourism.opendatahub.bz.it/v1/ODHActivityPoi?pagenumber=1&type=32&categorycodefilter=${code}&longitude=${longitude}&latitude=${latitude}&radius=${radius}&removenullvalues=false`
        );
        const json = await response.json();
        return json.Items as GastronomyResponse[];
    }
}
