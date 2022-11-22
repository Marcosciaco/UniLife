import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableHighlight,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import WeatherAPIUtil, { WeatherTempImage } from "../utils/WeatherAPIUtil";
import MapView, { PROVIDER_DEFAULT, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import GastronomyAPIUtil, {
    GastronomyResponse,
} from "../utils/GastronomyAPIUtil";
import { CategoryCode } from "../models/CategoryCode";
import { InviteNotification } from "../components/InviteNotification";
import MenuIcon from "../assets/icons/menu";
import LogoIcon from "../assets/icons/logo";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function HomeScreen({ navigation }: any) {
    const [weatherData, setWeatherData] = React.useState("");
    const [location, setLocation] = useState<LocationObject>();
    const [restaurants, setRestaurants] = useState<GastronomyResponse[]>([]);

    React.useEffect(() => {
        WeatherAPIUtil.getWeatherforecast().then((data) => {
            setWeatherData(data.WeatherDesc);
        });
    }, []);

    React.useEffect(() => {
        (async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    React.useEffect(() => {
        if (location) {
            GastronomyAPIUtil.getGastronomyLocales(
                CategoryCode.CAFE,
                location?.coords.latitude,
                location?.coords.longitude,
                10000
            ).then((data) => {
                setRestaurants(data);
            });
        }
    }, [location]);

    function HeaderRow() {
        return (
            <View
                style={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <TouchableHighlight
                    underlayColor={"#FBFDFF"}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    <MenuIcon
                        color={"#2B363F"}
                        height={30}
                        width={30}
                    ></MenuIcon>
                </TouchableHighlight>
                <LogoIcon color={"#2B363F"} width={40} height={40}></LogoIcon>
            </View>
        );
    }

    function NotificationContainer() {
        return (
            <View
                style={{
                    marginHorizontal: 20,
                    backgroundColor: "#F3F8FF",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                    height: "25%",
                    borderRadius: 15,
                    overflow: "hidden",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: 15,
                        lineHeight: 30,
                        padding: 5,
                        paddingBottom: 0,
                        paddingLeft: 10,
                        textAlign: "left",
                    }}
                >
                    Notifications
                </Text>
                <InviteNotification
                    person="Marco"
                    type="drink"
                ></InviteNotification>
            </View>
        );
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#FBFDFF",
                paddingTop: StatusBar.currentHeight,
                flexGrow: 1,
            }}
        >
            <ExpoStatusBar backgroundColor="#FBFDFF" style="dark" />
            <HeaderRow />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginLeft: 20,
                    marginRight: 20,
                    overflow: "hidden",
                }}
            >
                <WeatherTempImage></WeatherTempImage>
                <View
                    style={{
                        height: 120,
                        marginLeft: 20,
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "Poppins_600SemiBold",
                            height: 120,
                            padding: 20,
                            textAlign: "left",
                            borderRadius: 15,
                            textAlignVertical: "center",
                            backgroundColor: "#F3F8FF",
                        }}
                    >
                        Hi Marco 👋{"\n"}It's a {weatherData} day
                    </Text>
                </View>
            </View>
            <NotificationContainer />
            <View
                style={{
                    overflow: "hidden",
                    padding: 20,
                    flexGrow: 1,
                }}
            >
                <View
                    style={{
                        flexGrow: 1,
                        width: "100%",
                        backgroundColor: "#F3F8FF",
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    <MapView
                        region={{
                            latitude: location?.coords.latitude || 0,
                            longitude: location?.coords.longitude || 0,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
                        mapType="satellite"
                        provider={PROVIDER_DEFAULT}
                        style={{
                            flexGrow: 1,
                            width: "100%",
                            borderRadius: 15,
                        }}
                    >
                        {restaurants.map((restaurant) => (
                            <Marker
                                key={restaurant.Id}
                                icon={require("../assets/icons/pin.png")}
                                coordinate={{
                                    latitude:
                                        restaurant.GpsPoints.position
                                            .Latitude || 0,
                                    longitude:
                                        restaurant.GpsPoints.position
                                            .Longitude || 0,
                                }}
                                title={restaurant.Detail.de.Title}
                            >
                                <Callout tooltip={true}>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#FBFDFF",
                                            borderRadius: 15,
                                            padding: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Poppins_400Regular",
                                                textAlign: "center",
                                            }}
                                        >
                                            {restaurant.Shortname}
                                        </Text>
                                    </View>
                                </Callout>
                            </Marker>
                        ))}
                    </MapView>
                </View>
            </View>
        </SafeAreaView>
    );
}
