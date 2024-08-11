import { FC, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ConfirmModal from '../modals/ConfirmModal'

type Props = {
    productData: any[];
    setPhoto: (photo: { uri: string } | null) => void;
    moveToNextSlide: () => void;
}

const BuyOrSaveButton: FC<Props> = ({ productData, setPhoto, moveToNextSlide }) => {

    const saveProduct = async () => {
        try {
            if (productData.length > 0) {
                console.log('save product')
            }
        } catch (error) {

        } finally {
            setPhoto(null)
        }
    }

    return (
        <>
            <Text style={styles.question}>Would you buy this now?</Text>
            <View style={styles.buttonWrap}>
                <TouchableOpacity onPress={saveProduct} style={styles.button}>
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={moveToNextSlide} style={styles.button}>
                    <Text style={styles.text}>Buy now</Text>
                </TouchableOpacity>
            </View>

        </>
    )
}

export default BuyOrSaveButton

const styles = StyleSheet.create({
    question: {
        color: '#002020',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    buttonWrap: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 'auto',
    },
    button: {
        width: 120,
        height: 70,
        backgroundColor: '#60969A',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    text: {
        color: '#EBF1F6',
        fontSize: 16,
        fontWeight: '500',
    },
});