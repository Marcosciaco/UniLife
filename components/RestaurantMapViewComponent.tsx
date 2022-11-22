import React from "react";
import { View, Text } from "react-native";
import MapView, { Callout, Marker, PROVIDER_DEFAULT } from "react-native-maps";

export default function RestaurantMapView({ location, restaurants }: any) {
    return (
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
            {restaurants.map((restaurant: any) => (
                <Marker
                    key={restaurant.Id}
                    icon={require("../assets/icons/pin.png")}
                    coordinate={{
                        latitude: restaurant.GpsPoints.position.Latitude || 0,
                        longitude: restaurant.GpsPoints.position.Longitude || 0,
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
                                    fontFamily: "Poppins_400Regular",
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
    );
}
