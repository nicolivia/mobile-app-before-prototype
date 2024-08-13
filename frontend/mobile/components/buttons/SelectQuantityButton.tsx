import { FC, useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Easing } from 'react-native'
import ConfirmModal from '../modals/ConfirmModal'
import MinusIcon from '../../assets/images/minus.png'
import PlusIcon from '../../assets/images/plus.png'

type Props = {
    productData: any[];
    addToCart: (product: any, quantity: number) => void;
    setPhoto: (photo: { uri: string } | null) => void;
    moveToNextSlide: () => void;
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
    orderQuantity: number;
    handleAddToCart: () => void;
}

const SelectQuantityButton: FC<Props> = ({
    productData,
    addToCart,
    setPhoto,
    increaseQuantity,
    decreaseQuantity,
    orderQuantity,
    handleAddToCart
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const showModal = () => {
        setModalVisible(true)
    }

    const moveUp = () => {
        animateQuantityChange('up')
        increaseQuantity()
    }

    const moveDown = () => {
        animateQuantityChange('down')
        decreaseQuantity()
    }

    const animateQuantityChange = (direction: 'up' | 'down') => {
        animatedValue.setValue(direction === 'up' ? -1 : 1);
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    };

    const translateY = animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [20, 0, -20],
    });

    return (
        <>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={moveDown}>
                    <View style={styles.iconCover}>
                        <View style={styles.iconWrap}>
                            <Image source={MinusIcon} style={styles.mathSymbol} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.textWrap}>
                    <Animated.Text style={[styles.quantityText, { transform: [{ translateY }] }]}>
                        {orderQuantity}
                    </Animated.Text>
                </View>
                <TouchableOpacity onPress={moveUp}>
                    <View style={styles.iconCover}>
                        <View style={styles.iconWrap}>
                            <Image source={PlusIcon} style={styles.mathSymbol} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonWrap}>
                <TouchableOpacity onPress={handleAddToCart} style={styles.checkout}>
                    <Text style={styles.checkoutText}>Add to cart</Text>
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

export default SelectQuantityButton

const styles = StyleSheet.create({
    quantityContainer: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
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
    iconCover: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#d0d0d0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrap: {
        width: 12,
        height: 20,
        resizeMode: 'contain'
    },
    mathSymbol: {
        width: 15,
        height: 20,
        resizeMode: 'contain'
    },
    textWrap: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    quantityText: {
        color: '#002020',
        fontSize: 50,
        fontWeight: 'bold',
    }
});