import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { View, ImageBackground, Image, Text } from "react-native";

export function CustomDrawerContent(props: any) {
    return (
        <View style={{ flex: 1, height: 1000 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    backgroundColor: "#FBFDFF",
                }}
            >
                <ImageBackground
                    source={require("../assets/images/drawer-background.png")}
                    style={{ padding: 20 }}
                >
                    <Image
                        source={require("../assets/images/user-profile.jpg")}
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                            marginBottom: 10,
                        }}
                    />
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 18,
                            fontFamily: "Poppins_300Light",
                            marginBottom: 5,
                        }}
                    >
                        John Doe
                    </Text>
                </ImageBackground>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 10,
                        height: "100%",
                    }}
                >
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
        </View>
    );
}
