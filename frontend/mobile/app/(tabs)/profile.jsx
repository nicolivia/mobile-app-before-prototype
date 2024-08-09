import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'


export default function profile() {
    const onPress = React.useCallback(async () => { }, []);
    return (
        <View>
            {/* <View style={{
                display: 'flex', alignItems: 'center', margintop: 100
            }}>
                <Image source={require('../../assets/images/image.png')}
                    style={{ width: 250, height: 450, borderRadius: 20, borderWidth: 6, borderColor: '#000' }} />
            </View>
            <View style={styles.subContainer}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: 'outfit-bold',
                    textAlign: 'center'
                }}> Your ultimate <Text style={{ color: Colors.PRIMARY }}>
                        Go-to online pharmacy app </Text>for your needs</Text>
                <Text style={{
                    fontSize: 15,
                    fontFamily: a 'outfit-Medium',
                    textAlign: 'center',
                    marginVertical: 15,
                    color: Colors.GRAY

                }}> Your one stop to look for all the pharmacy needs </Text>

                <TouchableOpacity style={styles.btn}
                    onPress={onPress}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontFamily: 'outfit-medium'
                    }}> Sign In</Text>
                </TouchableOpcity>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: '#fff', padding: 20,
        marginTop: -20,
    },

    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 20,
    }
})
