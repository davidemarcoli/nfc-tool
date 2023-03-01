/**
 * @format
 */

import {AppRegistry, useColorScheme} from 'react-native';
import {Provider as PaperProvider, useTheme} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import {MD3LightTheme, MD3DarkTheme} from "react-native-paper";

export default function Main() {
    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
