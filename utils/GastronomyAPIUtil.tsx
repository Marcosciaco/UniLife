import { CategoryCode } from "../models/CategoryCode";

export type GastronomyResponse = {
    Id: string;
    CategoryCodes: {
        Self: string;
        Id: string;
        Shortname: string;
    }[];
    Shortname: string;
    GpsPoints: {
        position: {
            Latitude: number;
            Logitude: number;
        };
    };
    Detail: {
        de: {
            Title: string;
            Language: string;
            MetaDesc: string;
            MetaTitle: string;
        };
        en: {
            Title: string;
            Language: string;
            MetaTitle: string;
            MetaDesc: string;
        };
        it: {
            Title: string;
            Language: string;
            MetaDesc: string;
            MetaTitle: string;
        };
    };
    ImageGallery: {
        Width: number;
        Height: number;
        ImageUrl: string;
    }[];
    SmgTags: string[];
    HasLanguage: string[];
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
