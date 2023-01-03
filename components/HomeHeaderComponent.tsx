import React from "react";
import { TouchableHighlight, View, StyleSheet } from "react-native";
import LogoIcon from "../assets/icons/logo";
import MenuIcon from "../assets/icons/menu";
import { dark, white } from "../utils/Theme";

export default function HeaderRow({ navigation }: any) {
    return (
        <View style={styles.container}>
            <TouchableHighlight
                underlayColor={white}
                onPress={() => {
                    navigation.openDrawer();
                }}
            >
                <MenuIcon color={dark} height={30} width={30}></MenuIcon>
            </TouchableHighlight>
            <LogoIcon color={dark} width={40} height={40}></LogoIcon>
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
