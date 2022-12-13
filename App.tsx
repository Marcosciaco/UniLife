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
import MensaScreen from "./views/Mensa";
import RoomsScreen from "./views/Rooms";
import SocializeScreen from "./views/Socialize";
import ToUniScreen from "./views/ToUni";
import DoorIcon from "./assets/icons/door";
import DrinkIcon from "./assets/icons/drink";
import HomeIcon from "./assets/icons/home";
import MensaIcon from "./assets/icons/mensa";
import PinIcon from "./assets/icons/pin";
import LoginScreen from "./views/Login";
import ProfileScreen from "./views/Profile";
import SettingsScreen from "./views/Settings";

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
                    drawerLabelStyle: {
                        fontFamily: "Poppins_400Regular",
                    },
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <HomeIcon color={color} height={20} width={20} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Rooms"
                    component={RoomsScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <DoorIcon color={color} height={20} width={20} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Mensa"
                    component={MensaScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <MensaIcon color={color} height={20} width={20} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Socialize"
                    component={SocializeScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <DrinkIcon color={color} height={20} width={20} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Get to university"
                    component={ToUniScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <PinIcon color={color} height={20} width={20} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <PinIcon color={color} height={20} width={20} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <PinIcon color={color} height={20} width={20} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <PinIcon color={color} height={20} width={20} />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
