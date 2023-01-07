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
            Longitude: number;
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
