import React from "react";
import NfcManager, {NdefRecord, NfcTech, TagEvent} from "react-native-nfc-manager";
import {SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

export default function ReadPage() {
    const [isNfcSupported, setIsNfcSupported] = React.useState(false);
    const [isNfcEnabled, setIsNfcEnabled] = React.useState(false);
    const [isReading, setIsReading] = React.useState(false);
    const [tag, setTag] = React.useState<TagEvent>();

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    // function bin2String(array: string[]) {
    //     console.log(array);
    //     let result = "";
    //     for (let i = 0; i < array.length; i++) {
    //         result += String.fromCharCode(parseInt(array[i], 2));
    //     }
    //     return result;
    // }

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

    const getTextFromNdef = (ndefMessage: NdefRecord[]) => {
        const texts = ndefMessage.map(record => {
            const payload = record.payload.slice(3);
            return String.fromCharCode.apply(null, payload);
        });

        return texts;

        // const text = ndefMessage[0].payload.slice(3);
        // return String.fromCharCode.apply(null, text);
    }

    async function readNdef() {
        try {
            console.debug('readNdef');

            setIsReading(true);
            console.debug('requesting NDEF technology');
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            console.debug('end requesting NDEF technology');
            setIsReading(false)

            console.debug('reading NDEF tag');
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            console.debug('end reading NDEF tag');

            if (!tag) return;

            setTag(tag)

            console.info('Tag found', tag);
            console.log(tag.ndefMessage);
            console.log(tag.ndefMessage[0].payload);
            // convert the payload to a string (example payload: [104, 101, 108, 108, 111])
            // const payload = tag.ndefMessage[0].payload.slice(3);
            // const text = String.fromCharCode.apply(null, payload);
            const text = getTextFromNdef(tag.ndefMessage);
            console.log(text);
        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            await NfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
                animated={true}
                // hidden={true}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View
                    style={{
                        // backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        width: '100%',
                        height: '100%',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                    <Text>Is NFC supported? {isNfcSupported ? 'Yes' : 'No'}</Text>
                    <Text>Is NFC enabled? {isNfcEnabled ? 'Yes' : 'No'}</Text>
                    <Text>Is reading? {isReading ? 'Yes' : 'No'}</Text>
                    <Text>Tag: {JSON.stringify(tag)}</Text>
                    {/*<Text>Text: {tag ? getTextFromNdef(tag.ndefMessage) : ''}</Text>*/}

                    <Text>Content:</Text>
                    {tag && tag.ndefMessage && getTextFromNdef(tag.ndefMessage).map((text, index) => (
                        <Text key={index}>{text}</Text>
                    ))}

                    <TouchableOpacity onPress={readNdef}>
                        <Text>Scan a Tag</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}