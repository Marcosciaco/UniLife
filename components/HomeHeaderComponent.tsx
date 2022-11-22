import React from "react";
import { TouchableHighlight, View, StyleSheet } from "react-native";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";

export default function HeaderRow({ navigation }: any) {
    return (
        <View style={styles.container}>
            <TouchableHighlight
                underlayColor={"#FBFDFF"}
                onPress={() => {
                    navigation.openDrawer();
                }}
            >
                <MenuIcon color={"#2B363F"} height={30} width={30}></MenuIcon>
            </TouchableHighlight>
            <LogoIcon color={"#2B363F"} width={40} height={40}></LogoIcon>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
