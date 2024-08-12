import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native'
import ConfirmModal from '../modals/ConfirmModal'
import { Product, CartItem } from '@/utils'
import CartImage from '../../assets/images/cart.png'

type Props = {
    cart: CartItem[];
    setPhoto: (photo: { uri: string } | null) => void;
    moveToNextSlide: () => void;
    backToCamera: () => void;
}

const CheckoutButton: FC<Props> = ({ cart, setPhoto, moveToNextSlide, backToCamera }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [totalProductNumber, setTotalProductNumber] = useState(0);

    const showCart = () => {
        if (showCartModal === false && cart.length > 0) setShowCartModal(true)
    }

    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        setTotalProductNumber(total);
    }, [cart]);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleWrap}>
                    <Text style={styles.titleText}>My Cart</Text>
                </View>
                <View style={styles.productContainer}>
                    {cart.map((item) => (
                        <View key={item.productName} style={styles.productWrap}>
                            <View style={styles.imageWrap}>
                                <Image source={CartImage} style={styles.image} />
                            </View>
                            <View>
                                <Text>{item.productName} product name</Text>
                                <Text>{item.price} $40.00</Text>
                            </View>
                            <View style={styles.productNumberCover}>

                                <Text style={styles.quantityText}>{totalProductNumber}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View></View>
                <View style={styles.buttonWrap}>
                    <TouchableOpacity onPress={backToCamera} style={styles.cancel}>
                        <Text style={styles.cancelText}>Buy more</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={moveToNextSlide} style={styles.checkout}>
                        <Text style={styles.checkoutText}>Go to checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modals */}
            {modalVisible && (
                <ConfirmModal question='Are you sure to delete all?' setPhoto={setPhoto} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            )}
        </>
    )
}

export default CheckoutButton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 930,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginHorizontal: 'auto',
        backgroundColor: 'white',
        // backgroundColor: '#EBF1F6'
    },
    titleWrap: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#002020',
    },
    productContainer: {
        width: '100%',
        height: 530,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'blue',
        marginBottom: 20,
    },
    productWrap: {
        width: '90%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: 'auto',
        marginBottom: 10,
        borderRadius: 25,
        backgroundColor: 'red',
    },
    imageWrap: {
        width: 60,
        height: 60,
        backgroundColor: '#60969A',
        borderRadius: 10,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    buttonWrap: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: 'auto',
    },
    checkout: {
        width: 150,
        height: 70,
        backgroundColor: '#60969A',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
        marginBottom: 20,
    },
    cancel: {
        width: 150,
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
    productNumberCover: {
        width: 25,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        color: '#002020',
        fontSize: 16,
        fontWeight: '500',
    }
});