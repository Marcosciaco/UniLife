import React from "react";
import { Image, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { GastronomyResponse } from "../models/GastronomyResponse";
import { white } from "../utils/Theme";

export default function RestaurantMapView({
    location,
    restaurants,
}: any): JSX.Element {
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
            style={styles.map}
        >
            {restaurants.map((restaurant: GastronomyResponse) => {
                let image = require("../assets/icons/pin.png");
                if (
                    restaurant.ImageGallery != null &&
                    restaurant.ImageGallery.length > 0
                ) {
                    image = { uri: restaurant.ImageGallery[0].ImageUrl };
                }

                return (
                    <Marker
                        key={restaurant.Id}
                        coordinate={{
                            latitude:
                                restaurant.GpsPoints.position.Latitude || 0,
                            longitude:
                                restaurant.GpsPoints.position.Longitude || 0,
                        }}
                        title={restaurant.Detail.de.Title}
                        style={styles.marker}
                    >
                        <Image source={image} style={styles.marker} />
                    </Marker>
                );
            })}
        </MapView>
    );
}

export const styles = StyleSheet.create({
    tooltipContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: white,
        borderRadius: 15,
        padding: 10,
    },
    map: {
        flexGrow: 1,
        width: "100%",
        borderRadius: 15,
    },
    marker: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});
