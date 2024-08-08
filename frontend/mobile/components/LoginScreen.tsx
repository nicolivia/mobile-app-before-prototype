import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();
            if (createdSessionId && setActive) {
                setActive({ session: createdSessionId });
            } else {
                // use signIn or signUp for next steps
            }
        } catch (err) {
            console.error("OAuth error ", err);
        }
    }, [startOAuthFlow]);

    return (
        <View>
            <View style={{ display: 'flex', alignItems: 'center', marginTop: 100 }}>
                <Image
                    source={require('./../../image-recognition-app/assets/images/image.png')}
                    style={{ width: 250, height: 450, borderRadius: 20, borderWidth: 6, borderColor: '#000' }}
                />
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.mainText}>
                    Your ultimate <Text style={{ color: Colors.PRIMARY }}>Go-to online pharmacy app</Text> for your needs
                </Text>
                <Text style={styles.subText}>
                    Your one stop to look for all the pharmacy needs
                </Text>
                <TouchableOpacity style={styles.btn} onPress={onPress}>
                    <Text style={styles.btnText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20,
    },
    mainText: {
        fontSize: 30,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
    },
    subText: {
        fontSize: 15,
        fontFamily: 'outfit-Medium',
        textAlign: 'center',
        marginVertical: 15,
        color: Colors.GRAY,
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 20,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'outfit-medium',
    },
});
