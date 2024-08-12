import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native'
import ConfirmModal from '../modals/ConfirmModal'
import { Product, CartItem } from '@/utils'
import CartImage from '../../assets/images/cart.png'
import MinusIcon from '../../assets/images/minus.png'
import PlusIcon from '../../assets/images/plus.png'
import TrashIcon from '../../assets/images/trash.png'

type Props = {
    cart: CartItem[];
    setPhoto: (photo: { uri: string } | null) => void;
    moveToNextSlide: () => void;
    backToCamera: () => void;
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
    orderQuantity: number;
}

const CheckoutButton: FC<Props> = ({
    cart,
    setPhoto,
    moveToNextSlide,
    backToCamera,
    increaseQuantity,
    decreaseQuantity,
    orderQuantity,
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleWrap}>
                    <Text style={styles.titleText}>My Cart</Text>
                </View>
                <View style={styles.productContainer}>
                    {cart.length === 0 && <Text>No product in your cart</Text>}
                    {cart.map((item) => (
                        <View key={item.productName} style={styles.productWrap}>
                            <View style={styles.imageWrap}>
                                <Image source={CartImage} style={styles.image} />
                            </View>
                            <View style={styles.itemInfoWrap}>
                                {/* Product Name and Price */}
                                <View style={styles.itemDetailWrapA}>
                                    <Text style={styles.productNameText}>{item.productName} product name</Text>
                                    <Text style={styles.priceText}>{item.price} $40.00</Text>
                                </View>
                                {/* Category */}
                                <View style={styles.itemDetailWrapB}>
                                    <Text style={styles.categoryText}>Brand name {item.brandName}</Text>
                                    <Text style={styles.categoryText}>Generic name {item.genericName}</Text>
                                </View>
                                {/* Quantity */}
                                <View style={styles.itemDetailWrapB}>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity onPress={decreaseQuantity}>
                                            <View style={styles.iconCover}>
                                                <View style={styles.iconWrap}>
                                                    <Image source={MinusIcon} style={styles.mathSymbol} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.textWrap}>
                                            <View style={styles.productNumberCover}>
                                                <Text style={styles.quantityText}>{orderQuantity}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={increaseQuantity}>
                                            <View style={styles.iconCover}>
                                                <View style={styles.iconWrap}>
                                                    <Image source={PlusIcon} style={styles.mathSymbol} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity >
                                        <View style={styles.trashIconCover}>
                                            <Image source={TrashIcon} style={styles.trashIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                {/* Total */}
                <View style={styles.footerContainer}>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.totalAmountContainer}>
                        <View style={styles.totalAmountWrap}>
                            <View>
                                <Text style={styles.totalLabelText}>Price: </Text>
                                <Text style={styles.totalLabelText}>Shipping: </Text>
                            </View>
                            <View>
                                <Text style={styles.totalPriceText}>$ 350.00</Text>
                                <Text style={styles.totalPriceText}>$ 3.00</Text>
                            </View>
                        </View>
                        <View style={styles.verticalLine}></View>
                        <View style={styles.totalAmountCover}>
                            <Text style={styles.totalDollarText}>$</Text>
                            <Text style={styles.totalAmountText}>353.00</Text>
                        </View>
                    </View>
                    <View style={styles.buttonWrap}>
                        <TouchableOpacity onPress={backToCamera} style={styles.cancel}>
                            <Text style={styles.cancelText}>Buy more</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={moveToNextSlide} style={styles.checkout}>
                            <Text style={styles.checkoutText}>Go to checkout</Text>
                        </TouchableOpacity>
                    </View>
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
        height: 940,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginHorizontal: 'auto',
        backgroundColor: '#EBF1F6'
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
        height: 470,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    productWrap: {
        width: '90%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        marginHorizontal: 'auto',
        marginBottom: 10,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    imageWrap: {
        width: 85,
        height: 85,
        backgroundColor: '#EBF1F6',
        borderRadius: 15,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    itemInfoWrap: {
        width: '70%',
        height: 70,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    itemDetailWrapA: {
        width: '100%',
        height: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    itemDetailWrapB: {
        width: '100%',
        height: 28,
        paddingLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productNameText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#002020',
    },
    priceText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#002020',
    },
    categoryWrap: {
        width: 100,
        height: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '300',
        color: '#002020',
    },
    quantityContainer: {
        width: 80,
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#EBF1F6',
        borderRadius: 10,
        marginTop: 10,
    },
    textWrap: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF1F6',
    },
    productNumberCover: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF1F6',
    },
    quantityText: {
        color: '#002020',
        fontSize: 16,
        fontWeight: '500',
    },
    iconCover: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrap: {
        width: 12,
        height: 12,
        resizeMode: 'contain'
    },
    mathSymbol: {
        width: 10,
        height: 10,
        resizeMode: 'contain'
    },
    trashIconCover: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    trashIcon: {
        width: 18,
        height: 20,
        resizeMode: 'contain'
    },
    footerContainer: {
        width: '90%',
        height: 'auto',
        flexDirection: 'column',
        marginHorizontal: 'auto',
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        borderRadius: 5,
        backgroundColor: '#757575',
        marginBottom: 5,
        marginHorizontal: 'auto',
    },
    totalAmountContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 'auto',
        marginBottom: 10,
    },
    totalAmountWrap: {
        width: 'auto',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 'auto',
    },
    totalLabelText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#757575',
    },
    totalPriceText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#002020',
        marginLeft: 5,
    },
    verticalLine: {
        width: 1,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#757575',
        marginHorizontal: 10,
    },
    totalAmountCover: {
        width: 'auto',
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginHorizontal: 'auto',
    },
    totalDollarText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#002020',
        marginTop: 2,
        marginRight: 5,
    },
    totalAmountText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#002020',
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
        height: 45,
        backgroundColor: '#60969A',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    cancel: {
        width: 150,
        height: 45,
        backgroundColor: '#C9D3DB',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    checkoutText: {
        color: '#EBF1F6',
        fontSize: 14,
        fontWeight: '400',
    },
    cancelText: {
        color: '#002020',
        fontSize: 14,
        fontWeight: '400',
    },
});