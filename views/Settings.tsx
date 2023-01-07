import * as ImagePicker from "expo-image-picker";
import { updatePassword, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditIcon from "../assets/icons/edit";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
import { auth, db, storage } from "../utils/Firebase";
import { dark, light, white } from "../utils/Theme";
import { getUserEmail } from "../utils/UserService";

export default function SettingsScreen({ navigation }: any) {
    const [imgProfile, setImgProfile] = useState<any>({
        uri: "https://picsum.photos/1920/1080",
    });

    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    React.useEffect(() => {
        if (auth.currentUser?.photoURL) {
            setImgProfile({ uri: auth.currentUser?.photoURL });
        }
        if (auth.currentUser?.displayName) {
            setName(auth.currentUser?.displayName);
        }
        if (auth.currentUser?.phoneNumber) {
            setPhoneNumber(auth.currentUser?.phoneNumber);
        }
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
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
            getDownloadURL(response.ref).then((downloadURL) => {
                setImgProfile({ uri: downloadURL });
                updateDoc(doc(db, "users", email), {
                    photoURL: downloadURL,
                });
                if (auth.currentUser) {
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL,
                    });
                }
            });
        });

        Alert.alert(
            "Photo uploaded!",
            "Your photo has been uploaded to Firebase Cloud Storage!"
        );
    };

    const saveHandler = () => {
        uploadImage();
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
        if (phoneNumber != "") {
        }
    };

    return (
        <SafeAreaView style={styles.container}>
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
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="black"
                    style={styles.textInput}
                    value={name}
                />
                <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="black"
                    style={styles.textInput}
                    value={phoneNumber}
                />
                <TextInput
                    placeholder="New Password"
                    placeholderTextColor="black"
                    style={styles.textInput}
                    value={password}
                />
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
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
        elevation: 3,
    },
});
