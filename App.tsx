import {
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    useFonts,
} from "@expo-google-fonts/poppins";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import DoorIcon from "./assets/icons/door";
import DrinkIcon from "./assets/icons/drink";
import GroupIcon from "./assets/icons/group";
import HomeIcon from "./assets/icons/home";
import PinIcon from "./assets/icons/pin";
import SettingsIcon from "./assets/icons/settings";
import { CustomDrawerContent } from "./components/DrawerContent";
import AllUsersScreen from "./views/AllUsers";
import HomeScreen from "./views/Home";
import LoginScreen from "./views/Login";
import RoomsScreen from "./views/Rooms";
import SettingsScreen from "./views/Settings";
import SocializeScreen from "./views/Socialize";
import ToUniScreen from "./views/ToUni";
import { RootSiblingParent } from "react-native-root-siblings";

const Drawer = createDrawerNavigator();

export default function App(): JSX.Element | null {
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
        <RootSiblingParent>
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={(props) => (
                        <CustomDrawerContent {...props} />
                    )}
                    initialRouteName={"Home"}
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
                                <HomeIcon
                                    color={color}
                                    height={20}
                                    width={20}
                                />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Rooms"
                        component={RoomsScreen}
                        options={{
                            drawerIcon: ({ color }) => (
                                <DoorIcon
                                    color={color}
                                    height={20}
                                    width={20}
                                />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Socialize"
                        component={SocializeScreen}
                        options={{
                            drawerIcon: ({ color }) => (
                                <DrinkIcon
                                    color={color}
                                    height={20}
                                    width={20}
                                />
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
                        name="All Users"
                        component={AllUsersScreen}
                        options={{
                            drawerIcon: ({ color }) => (
                                <GroupIcon
                                    color={color}
                                    height={20}
                                    width={20}
                                />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            drawerIcon: ({ color }) => (
                                <SettingsIcon
                                    color={color}
                                    height={20}
                                    width={20}
                                />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            drawerLabel: () => null,
                        }}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    );
}
