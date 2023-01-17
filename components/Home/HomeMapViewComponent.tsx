import { LocationObject } from "expo-location";
import React from "react";
import { Image, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { GastronomyResponse } from "../../models/GastronomyResponse";
import { User } from "../../models/User";
import { white } from "../../utils/Theme";

export default function HomeMapView({
    location,
    restaurants,
    users,
}: {
    location: LocationObject | undefined;
    restaurants: GastronomyResponse[];
    users: User[];
}): JSX.Element {
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
                let image = require("../../assets/icons/pin.png");
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
            {users
                .filter((u) => u.locationTracking)
                .map((user) => {
                    let image = require("../../assets/images/user_placeholder.png");
                    if (user.photoURL) {
                        image = { uri: user.photoURL };
                    }
                    return (
                        <Marker
                            key={user.email}
                            coordinate={{
                                latitude: user.location?.coords.latitude || 0,
                                longitude: user.location?.coords.longitude || 0,
                            }}
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
