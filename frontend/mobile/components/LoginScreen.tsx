import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../constants/colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId && setActive) {
                setActive({ session: createdSessionId });
            } else {
                //use sign or signup for next steps
            }
        } catch (err) {
            console.error("OAuth error ", err);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/image.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.titleText}>
                    Your ultimate <Text style={styles.highlightText}>
                        Go-to online pharmacy app</Text> for your needs
                </Text>
                <Text style={styles.descriptionText}>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    image: {
        width: 250,
        height: 450,
        borderRadius: 20,
        borderWidth: 6,
        borderColor: '#000',
    },
    subContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20,
    },
    titleText: {
        fontSize: 30,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
    },
    highlightText: {
        color: Colors.PRIMARY,
    },
    descriptionText: {
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
