import React, { FC } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import ProductImage from '../../assets/images/image.png'
import BoardIcon from '../../assets/images/board.png'
import PillIcon from '../../assets/images/pill.png'

type Props = {
    setPhoto: (photo: { uri: string } | null) => void;
}

const FoundButton: FC<Props> = ({ setPhoto }) => {
    const router = useRouter();


    const tryAgainTakePic = () => {
        setPhoto(null)
    }

    const moveOnNextScreen = () => {
        console.log('next page')
    }

    return (
        <>
            <Text style={styles.question}>Is this product you are looking for?</Text>
            <View style={styles.buttonWrap}>
                <TouchableOpacity onPress={tryAgainTakePic} style={styles.button}>
                    <Text style={styles.text}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={moveOnNextScreen} style={styles.button}>
                    <Text style={styles.text}>Yes</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default FoundButton

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: '100%',
        minHeight: '100%',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },


    button: {
        width: 100,
        height: 50,
        backgroundColor: '#60969A',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    text: {
        color: '#002020',
        fontSize: 14,
        fontWeight: 'regular',
    },
    stock: {
        color: '#002020',
        fontSize: 16,
        fontWeight: 'bold',
    },
    priceWrap: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    priceCover: {
        width: 'auto',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 10,
    },
    priceText: {
        color: '#002020',
        fontSize: 14,
        textAlign: 'right',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    question: {
        color: '#002020',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    }
});