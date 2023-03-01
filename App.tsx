/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import NfcManager from 'react-native-nfc-manager';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {DarkTheme as DefaultDarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import ReadPage from "./pages/ReadPage/ReadPage";
import {adaptNavigationTheme, Button, Surface, Text} from "react-native-paper";

function HomeScreen({ navigation }: NativeStackScreenProps<{ Home: undefined; Read: undefined; Write: undefined}>) {
    return (
        <Surface style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                onPress={() => navigation.navigate('Read')}
                >Got to blablabla</Button>
        </Surface>
    );
}

const Stack = createNativeStackNavigator();

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
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Read" component={ReadPage}/>
                <Stack.Screen name="Write" component={ReadPage}/>
            </Stack.Navigator>
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
