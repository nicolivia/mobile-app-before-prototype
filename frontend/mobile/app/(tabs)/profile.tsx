import { View, Text, Image, TouchableOpacity } from '../../components/index';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function Profile() {
    const onPress = React.useCallback(async () => { }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <View style={{ display: 'flex', alignItems: 'center', marginTop: 100 }}>
                {/* <Image
                    source={require('../../assets/images/icon.png')}
                    style={{ width: 150, height: 350, borderRadius: 20, borderWidth: 6, borderColor: '#000' }}
                /> */}
            </View>
            <View style={{ backgroundColor: '#fff', padding: 20, marginTop: -20 }}>
                <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', textAlign: 'center' }}>
                    Your ultimate <Text style={{ color: Colors.PRIMARY }}>Go-to online pharmacy app</Text> for your needs
                </Text>
                <Text style={{ color: '#6c757d' }}>Your one stop to look for all the pharmacy needs</Text>

                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 16,
                        borderRadius: 99,
                        marginTop: 20,
                    }}
                    onPress={onPress}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'outfit-medium' }}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}