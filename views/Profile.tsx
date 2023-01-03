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
import MenuIcon from "../assets/icons/menu";
import { dark, primary, secondary, white } from "../utils/Theme";

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
                        <MenuIcon color={white} height={30} width={30} />
                    </Pressable>
                    <LogoIcon color={white} width={40} height={40} />
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.profileHeader}>
                        <Text style={styles.title}>
                            {auth.currentUser?.displayName}
                        </Text>
                        <FollowButton onPress={() => null} />
                    </View>
                    <Text style={styles.subtitle}>
                        Bolzano Italy / Computer Science 3rd year
                    </Text>
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
        paddingTop: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: white,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        margin: 20,
        padding: 5,
        elevation: 3,
        borderColor: primary,
        borderWidth: 1,
        width: 90,
        backgroundColor: dark,
        fontFamily: "Poppins_400Regular",
    },
    text: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: primary,
    },
    title: {
        fontFamily: "Poppins_400Regular",
        color: secondary,
        fontSize: 24,
        marginLeft: 20,
    },
    subtitle: {
        color: white,
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        marginLeft: 20,
    },
    logo: {
        flex: 1,
        justifyContent: "space-between",
    },
    dataContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: dark,
        padding: 20,
    },
    profileHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
