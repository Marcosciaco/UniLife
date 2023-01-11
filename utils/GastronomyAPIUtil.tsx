import { CategoryCode } from "../models/CategoryCode";
import { GastronomyResponse } from "../models/GastronomyResponse";

export async function getGastronomyLocales(
    code: CategoryCode,
    latitude: number,
    longitude: number,
    radius: number
): Promise<GastronomyResponse[]> {
    const response = await fetch(
        `https://tourism.opendatahub.bz.it/v1/ODHActivityPoi?pagenumber=1&pagesize=50&type=32&categorycodefilter=${code}&longitude=${longitude}&latitude=${latitude}&radius=${radius}&removenullvalues=false`
    );
    const json = await response.json();

    return json.Items as GastronomyResponse[];
}
