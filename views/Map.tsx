import React, { useState } from "react";
import {
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function App() {
    const [dark, setDark] = useState(false);
    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
                <TouchableOpacity
                onPress = {() => setDark(!dark)}
                style={{ 
                    backgroundColor: "#fff",
                    height: 30,
                    borderRadius: 15,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    marginTop: 60,
                    alignSelf: "flex-end",
                    right: 20
                }}>
                    <FontAwesome name="adjust" size={30} />
                </TouchableOpacity>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map:{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

const mapStyle = [

    {
        elementType: "geometry",
        stylers:[
            {
                color: "#212121"
            }
        ]
    },
    {
        elementType: "geometry.fill",
        stylers:[
            {
                saturation: -5
            },
            {
                lightness: -5
            },
        ]
    }
    {
        elementType: "labels.icon",
        stylers:[
            {
                visibility: "off"
            }
        ]
    },
    {
        elementType: "labels.text.fill",
        stylers:[
            {
                color: "#757575"
            }
        ]
    },
    {
        elementType: "labels.text.stroke",
        stylers:[
            {
                color: "#212121"
            }
        ]
    },
    {
        featureTypes: "administrative",
        elementType: "geometry",
        styles: [
            {
                color: "#757575",
            }
        ]
    },
    {
        featureTypes: "administrative.country",
        elementType: "labels.text.fill",
        styles: [
            {
                color: "#9E9E9E",
            }
        ]
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [
            {
                visibility: "off",
            }
        ]
    },
    {
        featureType: "administrative.loyality",
        elementTypes: "labels.text.fill",
        stylers: [
            {
                color: "#BDBDBD"
            }
        ]
    },
    {
        featureType: "poi",
        elementTypes: "labels.text.fill",
        stylers: [
            {
                color: "#757575"
            }
        ]
    },
    {
        featureType: "poi.business",
        stylers: [
            {
                visibility: "off",
            }
        ]
    },
    {
        featureType: "poi.park",
        elementTypes: "geometry",
        stylers: [
            {
                color: "#181818",
            }
        ]
    },
    {
        featureType: "poi.park",
        elementTypes: "labels.text",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementTypes: "labels.text.fill",
        stylers: [
            {
                color: "#616161"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementTypes: "labels.text.stroke",
        stylers: [
            {
                color: "#1b1b1b"
            }
        ]
    },
    {
        featureType: "road",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementTypes: "geometry.fill",
        stylers: [
            {
                color: "#2c2c2c"
            }
        ]
    },
    {
        featureType: "road",
        elementTypes: "labels.text.fill",
        stylers: [
            {
                color: "#8a8a8a"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementTypes: "geometry",
        stylers: [
            {
                color: "#373737"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementTypes: "geometry",
        stylers: [
            {
                color: "#3c3c3c"
            }
        ]
    },
    {
        featureType: "road.highway.controlled_access",
        elementTypes: "geometry",
        stylers: [
            {
                color: "#4E4E4E"
            }
        ]
    },
    {
        featureType: "road.local",
        elementTypes: "glabels.text.fill",
        stylers: [
            {
                color: "#616161"
            }
        ]
    },
    {
        featureType: "transit",
        elementTypes: "labels.text.fill",
        stylers: [
            {
                color: "#757575"
            }
        ]
    },
    {
        featureType: "water",
        elementTypes: "geometry",
        stylers: [
            {
                color: "#000000"
            }
        ]
    },
    {
        featureType: "water",
        elementTypes: "labels.text.fill",
        stylers: [
            {
                color: "#3D3D3D"
            }
        ]
    },
];