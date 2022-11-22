import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./views/Home";

import "react-native-gesture-handler";

import {
    useFonts,
    Poppins_900Black,
    Poppins_800ExtraBold,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_300Light,
    Poppins_200ExtraLight,
    Poppins_100Thin,
} from "@expo-google-fonts/poppins";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "./components/DrawerContent";
import MailIcon from "./assets/icons/mail";
import MapScreen from "./views/Map";

const Drawer = createDrawerNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_900Black,
        Poppins_800ExtraBold,
        Poppins_700Bold,
        Poppins_600SemiBold,
        Poppins_500Medium,
        Poppins_400Regular,
        Poppins_300Light,
        Poppins_200ExtraLight,
        Poppins_100Thin,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <MailIcon color={color} height={30} width={30} />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
