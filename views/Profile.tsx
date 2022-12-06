import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
} from "react-native";
import { useState } from "react";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
const imgProfile = {
    uri: "https://www.nelsalento.com/wp-content/uploads/2018/02/Grotta-Verde-di-Andrano1.jpg.webp",
};

export function FollowButton(props: any) {
    const { onPress } = props;
    const [following, setFollowing] = useState<boolean>(true);
    const buttonText = following ? "Unfollow" : "Follow";

    const toggle = () => {
        onPress();
        setFollowing(!following);
    };
    return (
        <Pressable style={styles.button} onPress={toggle}>
            <Text style={styles.text}>{buttonText}</Text>
        </Pressable>
    );
}

export default function ProfileScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.logo}
                source={imgProfile}
                resizeMode="cover"
            >
                <Text style={styles.title}>Marco Sciacovelli</Text>
                <Text style={styles.subtitle}>
                    Bolzano Italy / Computer Science 3rd year{" "}
                </Text>
                <FollowButton onPress={() => null} />
            </ImageBackground>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 66,
        margin: 20,
        elevation: 3,
        backgroundColor: "#2B363F",
        fontFamily: "Poppins_400Regular",
    },
    text: {
        fontSize: 24,
        fontFamily: "Poppins_400Regular",
        color: "#AECFFF",
    },
    title: {
        fontFamily: "Poppins_400Regular",
        color: "#AECFFF",
        fontSize: 24,
        marginLeft: 20,
    },
    subtitle: {
        color: "#F3F8FF",
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        marginLeft: 20,
    },
    logo: {
        flex: 1,
        justifyContent: "flex-end",
    },
});
