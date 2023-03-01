/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import NfcManager, {TagEvent} from 'react-native-nfc-manager';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {DarkTheme as DefaultDarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import ReadPage from "./pages/ReadPage/ReadPage";
import {adaptNavigationTheme, Button, Surface, Text, Title} from "react-native-paper";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import WritePage from "./pages/WritePage/WritePage";

function HomeScreen({ navigation }: NativeStackScreenProps<{ Home: undefined; Read: undefined; Write: undefined}>) {
    const [isNfcSupported, setIsNfcSupported] = React.useState(false);
    const [isNfcEnabled, setIsNfcEnabled] = React.useState(false);

    React.useEffect(() => {
        NfcManager.isSupported().then(supported => {
            setIsNfcSupported(supported);
            if (supported) {
                NfcManager.isEnabled().then(enabled => {
                    setIsNfcEnabled(enabled);
                });
            }
        });
    }, []);

    return (
        <Surface style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Title>Home Screen</Title>

            <Text>Is NFC supported: {isNfcSupported ? 'Yes' : 'No'}</Text>
            <Text>Is NFC enabled: {isNfcEnabled ? 'Yes' : 'No'}</Text>

            <Button
                onPress={() => navigation.navigate('Read')}
                >Got to blablabla</Button>
        </Surface>
    );
}

const Tab = createMaterialBottomTabNavigator();

const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DefaultDarkTheme,
})

// Pre-step, call this before any NFC operations
NfcManager.start();

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode ? DarkTheme : LightTheme;

    return (
        <NavigationContainer theme={theme}>
            <Tab.Navigator initialRouteName="Home" shifting={true}>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: 'home',
                }}/>
                <Tab.Screen name="Read" component={ReadPage} options={{
                    tabBarIcon: 'nfc',
                }}/>
                <Tab.Screen name="Write" component={WritePage} options={{
                    tabBarIcon: 'cube-send',
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default App;
