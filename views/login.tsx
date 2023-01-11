import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";
import {
    buttonsAnimatedStyle,
    closeButtonContainerStyle,
    formButtonAnimatedStyle,
    imageAnimatedStyle,
    formAnimatedStyle,
} from "../assets/animations/Login";
import CloseIcon from "../assets/icons/close";
import LogoIcon from "../assets/icons/logo";
import {
    black,
    dark,
    height,
    light,
    primary,
    white,
    width,
} from "../utils/Theme";
import { login, register } from "../utils/UserService";

export default function LoginScreen({ navigation }: any): JSX.Element {
    const imagePosition = useSharedValue<number>(1);
    const formButtonScale = useSharedValue<number>(1);
    const [isRegistering, setIsRegistering] = useState<boolean>();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [studentId, setStudentId] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");

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
            <ExpoStatusBar backgroundColor="transparent" style="dark" />
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    imageAnimatedStyle(imagePosition),
                ]}
            >
                <View style={styles.logo}>
                    <LogoIcon height={50} width={50} color={dark}></LogoIcon>
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
                        closeButtonContainerStyle(imagePosition),
                    ]}
                >
                    <Text onPress={() => (imagePosition.value = 1)}>
                        <CloseIcon
                            height={20}
                            width={20}
                            color={dark}
                        ></CloseIcon>
                    </Text>
                </Animated.View>
            </Animated.View>
            <View style={styles.bottomContainer}>
                <Animated.View
                    style={[
                        styles.bottomContainer,
                        buttonsAnimatedStyle(imagePosition),
                    ]}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={registerHandler}
                            style={styles.registerButton}
                        >
                            <Text style={styles.registerButtonText}>
                                Register
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={loginHandler}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        styles.formInputContainer,
                        formAnimatedStyle(imagePosition),
                    ]}
                >
                    {isRegistering && (
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor={dark}
                            style={styles.textInput}
                            onChangeText={(text) => setDisplayName(text)}
                        />
                    )}
                    {isRegistering && (
                        <TextInput
                            placeholder="Student-Id"
                            placeholderTextColor={dark}
                            style={styles.textInput}
                            onChangeText={(text) => setStudentId(text)}
                        />
                    )}
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        placeholder="E-Mail"
                        placeholderTextColor={dark}
                        style={styles.textInput}
                    />
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
                        placeholderTextColor={dark}
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        style={[
                            styles.formButton,
                            formButtonAnimatedStyle(formButtonScale),
                        ]}
                        onPress={
                            isRegistering
                                ? () =>
                                      register(
                                          email,
                                          password,
                                          studentId,
                                          navigation,
                                          displayName
                                      )
                                : () => login(email, password, navigation)
                        }
                    >
                        <Text style={styles.buttonText}>
                            {isRegistering ? "Register" : "Login"}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: white,
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
        color: white,
    },
    highlightedText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 30,
        color: primary,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 5,
        backgroundColor: black,
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
        backgroundColor: white,
    },
    registerButton: {
        alignItems: "center",
        justifyContent: "center",
        width: (width - 28) / 2,
        height: 66,
        margin: 2,
        borderRadius: 18,
        backgroundColor: black,
    },
    loginButtonText: {
        color: black,
        fontSize: 20,
        fontFamily: "Poppins_300Light",
    },
    registerButtonText: {
        color: white,
        fontSize: 20,
        fontFamily: "Poppins_300Light",
    },
    button: {
        backgroundColor: white,
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
        color: white,
        letterSpacing: 0.5,
        fontFamily: "Poppins_400Regular",
    },
    bottomContainer: {
        justifyContent: "center",
        height: height * 0.38,
    },
    textInput: {
        height: 45,
        backgroundColor: light,
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
        backgroundColor: primary,
    },
    formInputContainer: {
        zIndex: -1,
        marginBottom: 10,
    },
    closeButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignSelf: "center",
        shadowColor: light,
        ShadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: light,
        alignItems: "center",
        borderRadius: 20,
        top: -20,
    },
});
