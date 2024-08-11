import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ConfirmModal from '../modals/ConfirmModal'

type Props = {
    orderQuantity: number;
    setPhoto: (photo: { uri: string } | null) => void;
    moveToNextSlide: () => void;
}

const CheckoutButton: FC<Props> = ({ orderQuantity, setPhoto, moveToNextSlide }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true)
    }

    const decreaseQuantity = () => {
        orderQuantity--;
    }

    const increaseQuantity = () => {
        orderQuantity++;
    }

    return (
        <>
            <View style={styles.quantityContainer}>
                <View></View>
                <TouchableOpacity onPress={decreaseQuantity}>
                    <View>Minus</View>
                </TouchableOpacity>
                <View>
                    {orderQuantity}
                </View>
                <View></View>
                <TouchableOpacity onPress={increaseQuantity}>
                    <View>Plus</View>
                </TouchableOpacity>
                <View></View>
            </View>
            <View style={styles.buttonWrap}>
                <TouchableOpacity onPress={moveToNextSlide} style={styles.checkout}>
                    <Text style={styles.checkoutText}>Go to checkout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showModal} style={styles.cancel}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for confirmation */}
            {modalVisible && (
                <ConfirmModal question='Would you cancel the order?' setPhoto={setPhoto} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            )}
        </>
    )
}

export default CheckoutButton

const styles = StyleSheet.create({
    quantityContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginHorizontal: 'auto',
    },
    buttonWrap: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        marginTop: 30,
        marginHorizontal: 'auto',
    },
    checkout: {
        width: '90%',
        height: 70,
        backgroundColor: '#60969A',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
        marginBottom: 20,
    },
    cancel: {
        width: '90%',
        height: 70,
        backgroundColor: '#C9D3DB',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    checkoutText: {
        color: '#EBF1F6',
        fontSize: 16,
        fontWeight: '500',
    },
    cancelText: {
        color: '#002020',
        fontSize: 16,
        fontWeight: '500',
    },
});