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
    withSequence,
    withSpring,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

export default function LoginScreen() {
    const imagePosition = useSharedValue(1);
    const formButtonScale = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [-height * 0.52, 0]
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
                <Svg height={height + 100} width={width}>
                    <ClipPath id="ClipPathId">
                        <Ellipse cx={width / 2} rx={height} ry={height + 100} />
                    </ClipPath>
                    <Image
                        href={require("../unibz_campus.jpg")}
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
                    <Text onPress={() => (imagePosition.value = 1)}>X</Text>
                </Animated.View>
            </Animated.View>
            <View style={styles.bottomContainer}>
                <Animated.View
                    style={[styles.bottomContainer, buttonsAnimatedStyle]}
                >
                    <Pressable style={styles.button} onPress={loginHandler}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={registerHandler}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </Pressable>
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
                        placeholder="E-Mail"
                        placeholderTextColor="black"
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="black"
                        style={styles.textInput}
                    />
                    <Animated.View
                        style={[styles.formButton, formButtonAnimatedStyle]}
                    >
                        <Pressable
                            onPress={() =>
                                (formButtonScale.value = withSequence(
                                    withSpring(1.5),
                                    withSpring(1)
                                ))
                            }
                        >
                            <Text style={styles.buttonText}>
                                {isRegistering ? "REGISTER" : "LOG IN"}
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
    button: {
        backgroundColor: "rgba(243,248,255,2)",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "white",
    },
    buttonText: {
        fontSize: 20,
        color: "rgba(56,73,86,1)",
        letterSpacing: 0.5,
    },
    bottomContainer: {
        justifyContent: "center",
        height: height * 0.38,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        backgroundColor: "rgba(243,248,255,2)",
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        paddingLeft: 10,
    },
    formButton: {
        backgroundColor: "rgba(243,248,255,2)",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
