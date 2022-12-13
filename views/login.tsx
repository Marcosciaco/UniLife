import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Pressable,
} from "react-native";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    withDelay,
} from "react-native-reanimated";
import CloseIcon from "../assets/icons/close";
import LogoIcon from "../assets/icons/logo";
import { login, register } from "../utils/UserService";

const { height, width } = Dimensions.get("window");

export default function LoginScreen() {
    const imagePosition = useSharedValue(1);
    const formButtonScale = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [-height * 0.57, 0]
        );
        return {
            transform: [
                { translateY: withTiming(interpolation, { duration: 1000 }) },
            ],
        };
    });

    const buttonsAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [500, 0]
        );
        return {
            opacity: withTiming(imagePosition.value, { duration: 500 }),
            transform: [
                { translateY: withTiming(interpolation, { duration: 1000 }) },
            ],
        };
    });

    const closeButtonContainerStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [180, 360]
        );
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {
                duration: 800,
            }),
            transform: [
                {
                    rotate: withTiming(interpolation + "deg", {
                        duration: 1000,
                    }),
                },
            ],
        };
    });

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity:
                imagePosition.value === 0
                    ? withDelay(400, withTiming(1, { duration: 800 }))
                    : withTiming(0, { duration: 300 }),
        };
    });

    const formButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: formButtonScale.value }],
        };
    });

    const loginHandler = () => {
        imagePosition.value = 0;
        if (isRegistering) {
            setIsRegistering(false);
        }
    };

    const registerHandler = () => {
        imagePosition.value = 0;
        if (!isRegistering) {
            setIsRegistering(true);
        }
    };

    return (
        <Animated.View style={styles.container}>
            <Animated.View
                style={[StyleSheet.absoluteFill, imageAnimatedStyle]}
            >
                <View style={styles.logo}>
                    <LogoIcon height={50} width={50} color="#2B363F"></LogoIcon>
                </View>
                <View style={styles.promoText}>
                    <Text style={styles.standardText}>Join the</Text>
                    <Text style={styles.highlightedText}>University</Text>
                    <Text style={styles.standardText}>Experience</Text>
                </View>
                <Svg height={height + 100} width={width}>
                    <ClipPath id="ClipPathId">
                        <Ellipse cx={width / 2} rx={height} ry={height + 100} />
                    </ClipPath>
                    <Image
                        href={require("../assets/images/unibz_campus.jpg")}
                        width={width + 100}
                        height={height + 100}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#ClipPathId)"
                    />
                </Svg>
                <Animated.View
                    style={[
                        styles.closeButtonContainer,
                        closeButtonContainerStyle,
                    ]}
                >
                    <Text onPress={() => (imagePosition.value = 1)}>
                        <CloseIcon
                            height={20}
                            width={20}
                            color="#2B363F"
                        ></CloseIcon>
                    </Text>
                </Animated.View>
            </Animated.View>
            <View style={styles.bottomContainer}>
                <Animated.View
                    style={[styles.bottomContainer, buttonsAnimatedStyle]}
                >
                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={registerHandler}
                            style={styles.registerButton}
                        >
                            <Text style={styles.registerButtonText}>
                                Register
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={loginHandler}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </Pressable>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        styles.formInputContainer,
                        formAnimatedStyle,
                    ]}
                >
                    {isRegistering && (
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="black"
                            style={styles.textInput}
                        />
                    )}
                    {isRegistering && (
                        <TextInput
                            placeholder="Student-Id"
                            placeholderTextColor="black"
                            style={styles.textInput}
                        />
                    )}
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        placeholder="E-Mail"
                        placeholderTextColor="black"
                        style={styles.textInput}
                    />
                    <TextInput
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
                        placeholderTextColor="black"
                        style={styles.textInput}
                    />
                    <Animated.View
                        style={[styles.formButton, formButtonAnimatedStyle]}
                    >
                        <Pressable
                            onPress={
                                isRegistering
                                    ? () => register(email, password)
                                    : () => login(email, password)
                            }
                        >
                            <Text style={styles.buttonText}>
                                {isRegistering ? "Register" : "Login"}
                            </Text>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "white",
    },
    logo: {
        position: "absolute",
        top: 50,
        right: 15,
        zIndex: 100,
    },
    promoText: {
        position: "absolute",
        bottom: 100,
        left: 15,
        zIndex: 100,
    },
    standardText: {
        fontSize: 30,
        fontFamily: "Poppins_300Light",
        color: "#F3F8FF",
    },
    highlightedText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 30,
        color: "#007BE2",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 5,
        backgroundColor: "#2B363F",
        margin: 10,
        height: 70,
        width: width - 20,
        borderRadius: 20,
        display: "flex",
        alignSelf: "stretch",
        flexDirection: "row",
    },
    loginButton: {
        alignItems: "center",
        justifyContent: "center",
        width: (width - 28) / 2,
        height: 66,
        margin: 2,
        borderRadius: 18,
        backgroundColor: "white",
    },
    registerButton: {
        alignItems: "center",
        justifyContent: "center",
        width: (width - 28) / 2,
        height: 66,
        margin: 2,
        borderRadius: 18,
        backgroundColor: "#2B363F",
    },
    loginButtonText: {
        color: "#2B363F",
        fontSize: 20,
        fontFamily: "Poppins_300Light",
    },
    registerButtonText: {
        color: "white",
        fontSize: 20,
        fontFamily: "Poppins_300Light",
    },
    button: {
        backgroundColor: "rgba(243,248,255,2)",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 15,
        color: "#F3F8FF",
        letterSpacing: 0.5,
        fontFamily: "Poppins_400Regular",
    },
    bottomContainer: {
        justifyContent: "center",
        height: height * 0.38,
    },
    textInput: {
        height: 45,
        backgroundColor: "#F3F8FF",
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        paddingLeft: 10,
        fontFamily: "Poppins_400Regular",
    },
    formButton: {
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: "#007BE2",
    },
    formInputContainer: {
        marginBottom: 70,
        zIndex: -1,
        justifyContent: "center",
    },
    closeButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignSelf: "center",
        shadowColor: "#000",
        ShadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 20,
        top: -20,
    },
});
