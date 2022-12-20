import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../utils/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getUserEmail } from "../utils/UserService";
import { updateProfile } from "firebase/auth";

export default function SettingsScreen() {
    const [image, setImage] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImage();
        }
    };

    const uploadImage = async () => {
        let uri = image;
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
                setImage(downloadURL);
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
        setImage("");
    };

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
            />
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                />
            )}
        </View>
    );
}
