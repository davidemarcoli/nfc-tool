import React from "react";
import NfcManager, {NdefRecord, NfcTech, Ndef, TagEvent} from "react-native-nfc-manager";
import {SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {Button, IconButton, Surface, TextInput} from "react-native-paper";


export default function WritePage() {
    const [isWriting, setIsWriting] = React.useState(false);

    const [text, setText] = React.useState('');

    async function writeNdef() {
        let result = false;

        try {
            // STEP 1
            console.debug('writeNdef');
            console.debug('requesting NDEF technology');
            setIsWriting(true);
            await NfcManager.requestTechnology(NfcTech.Ndef);
            setIsWriting(false);
            console.debug('end requesting NDEF technology');

            console.debug('encoding NDEF message');
            const bytes = Ndef.encodeMessage([Ndef.textRecord(text)]);
            console.debug('end encoding NDEF message');

            if (bytes) {
                console.debug('writing NDEF message');
                await NfcManager.ndefHandler // STEP 2
                    .writeNdefMessage(bytes); // STEP 3
                console.debug('end writing NDEF message');
                result = true;
            }
        } catch (ex) {
            console.warn(ex);
        } finally {
            // STEP 4
            await NfcManager.cancelTechnologyRequest();
        }

        return result;
    }

    return (
        // <SafeAreaView style={backgroundStyle}>
        //     <StatusBar
        //         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        //         backgroundColor={backgroundStyle.backgroundColor}
        //         animated={true}
        //         // hidden={true}
        //     />
        //     <ScrollView
        //         contentInsetAdjustmentBehavior="automatic"
        //         style={backgroundStyle}>
                <Surface
                    style={{
                        // backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        width: '100%',
                        height: '100%',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                    <Text>Is writing? {isWriting ? 'Yes' : 'No'}</Text>

                    <TextInput style={{width: '80%'}} label="Text to write" value={text} onChangeText={text => setText(text)}/>

                    <Button onPress={writeNdef} icon="nfc">
                        <Text>Write a Tag</Text>
                    </Button>

                </Surface>
        //     </ScrollView>
        // </SafeAreaView>
    );
}