import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Image,
} from "react-native";
import { useState } from "react";
import { auth } from "../utils/Firebase";
import LogoIcon from "../assets/icons/logo";

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
    const [imgProfile, setImgProfile] = useState<any>({
        uri: "https://picsum.photos/1920/1080",
    });

    React.useEffect(() => {
        if (auth.currentUser?.photoURL) {
            setImgProfile({ uri: auth.currentUser?.photoURL });
        }
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.logo}
                source={imgProfile}
                resizeMode="cover"
            >
                <View style={styles.header}>
                    <Pressable
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                    >
                        <LogoIcon color={"#2B363F"} height={30} width={30} />
                    </Pressable>
                    <LogoIcon color={"#2B363F"} width={40} height={40} />
                </View>
                {/* <Image source={imgProfile} style={styles.image}></Image> */}
                <View>
                    <Text style={styles.title}>
                        {auth.currentUser?.displayName}
                    </Text>
                    <Text style={styles.subtitle}>
                        Bolzano Italy / Computer Science 3rd year
                    </Text>
                    <FollowButton onPress={() => null} />
                </View>
            </ImageBackground>
        </View>
    );
}

export const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        marginTop: 20,
    },
    header: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 50,
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
        justifyContent: "space-between",
    },
});
