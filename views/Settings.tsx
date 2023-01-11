import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { updatePassword, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Switch } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import EditIcon from "../assets/icons/edit";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
import showToast from "../components/Inputs/Toast";
import { auth, db, storage } from "../utils/Firebase";
import {
    dark,
    light,
    primary,
    secondary,
    success,
    white,
    width,
} from "../utils/Theme";
import {
    getCurrentUser,
    getUserEmail,
    updateUserLocation,
} from "../utils/UserService";

export default function SettingsScreen({ navigation }: any): JSX.Element {
    const [imgProfile, setImgProfile] = useState<any>({
        uri: "https://picsum.photos/1920/1080",
    });

    const [name, setName] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [password, setPassword] = useState<string>("");
    const [isTracking, setIsTracking] = useState<boolean>();

    React.useEffect(() => {
        getCurrentUser().then((user) => {
            if (user) {
                setName(user.displayName || "");
                setImgProfile({ uri: user.photoURL });
                setPhoneNumber(user.phoneNumber || "");
                setIsTracking(user.locationTracking || false);
            }
        });
    }, []);

    React.useEffect(() => {
        (async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            updateUserLocation(auth.currentUser?.email as string, location);
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && imgProfile.uri != result.assets[0].uri) {
            setImgProfile({ uri: result.assets[0].uri });
        }
    };

    const uploadImage = async () => {
        let uri = imgProfile.uri;
        const filename = uri.substring(uri.lastIndexOf("/") + 1);
        const uploadUri =
            Platform.OS === "ios" ? uri.replace("file://", "") : uri;

        const email = getUserEmail() || "";
        const storageRef = ref(storage, "images/" + filename);

        const response = await fetch(uploadUri);
        const blob = await response.blob();

        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.then((response) => {
            getDownloadURL(response.ref)
                .then((downloadURL) => {
                    setImgProfile({ uri: downloadURL });
                    updateDoc(doc(db, "users", email), {
                        photoURL: downloadURL,
                    })
                        .then(() => {})
                        .catch((error) => {
                            showToast(error.message, error);
                        });
                    if (auth.currentUser) {
                        updateProfile(auth.currentUser, {
                            photoURL: downloadURL,
                        });
                    }
                })
                .then(() => {
                    showToast("Image updated", success);
                })
                .catch((error) => {
                    showToast(error.message, error);
                });
        });
    };

    const saveHandler = () => {
        showToast("Saved", success);
        if (password != "") {
            if (auth.currentUser) {
                updatePassword(auth.currentUser, password).then(() => {});
            }
        }
        if (name != "") {
            if (auth.currentUser) {
                updateProfile(auth.currentUser, {
                    displayName: name,
                });
            }
        }
        updateDoc(doc(db, "users", getUserEmail()), {
            displayName: name,
            phoneNumber: phoneNumber,
            locationTracking: isTracking,
        });
        uploadImage();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar backgroundColor="transparent" style="dark" />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    <MenuIcon color={dark} height={30} width={30} />
                </TouchableOpacity>
                <LogoIcon color={dark} height={40} width={40} />
            </View>
            <View style={styles.imageContainer}>
                <Image source={imgProfile} style={styles.profilePicture} />
                <TouchableOpacity
                    style={styles.profileChangeButton}
                    onPress={() => pickImage()}
                >
                    <EditIcon color={dark} height={20} width={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={[styles.label, styles.rowLabel]}>Username</Text>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="black"
                    style={styles.textInput}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Text style={[styles.label, styles.rowLabel]}>
                    Phone Number
                </Text>
                <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="black"
                    style={styles.textInput}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <Text style={[styles.label, styles.rowLabel]}>Password</Text>
                <TextInput
                    placeholder="New Password"
                    placeholderTextColor="black"
                    style={styles.textInput}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.locationContainer}>
                    <Text style={styles.label}>Location tracking</Text>
                    <Switch
                        trackColor={{ false: dark, true: secondary }}
                        thumbColor={isTracking ? primary : light}
                        ios_backgroundColor={light}
                        onValueChange={(enabled) => {
                            setIsTracking(enabled);
                        }}
                        value={isTracking}
                    ></Switch>
                </View>
                <TouchableOpacity
                    onPress={saveHandler}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: light,
        flex: 1,
        justifyContent: "space-between",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
    bottomContainer: {
        borderTopRightRadius: 20,
        justifyContent: "center",
        backgroundColor: white,
        padding: 10,
        elevation: 10,
        zIndex: 10,
    },
    saveButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 45,
        backgroundColor: dark,
    },
    saveButtonText: {
        color: light,
        fontSize: 20,
        fontFamily: "Poppins_300Light",
    },
    textInput: {
        height: 45,
        backgroundColor: light,
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 10,
        alignItems: "center",
        fontFamily: "Poppins_400Regular",
    },
    profileChangeButton: {
        bottom: 0,
        right: 0,
        backgroundColor: light,
        borderRadius: 20,
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -20,
        marginRight: -150,
        elevation: 10,
    },
    label: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        color: dark,
    },
    rowLabel: {
        marginTop: 5,
        marginLeft: 5,
    },
    locationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width - 20,
        padding: 0,
    },
});
