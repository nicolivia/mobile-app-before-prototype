import { FC, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, Animated, Dimensions } from 'react-native'
import FoundButton from '../buttons/FoundButton'
import BuyOrSaveButton from '../buttons/BuyOrSaveButton'
import CheckoutButton from '../buttons/CheckoutButton'
import SelectQuantityButton from '../buttons/SelectQuantityButton'
import ConfirmCostButton from '../buttons/ConfirmCostButton'
import ConfirmInformationButton from '../buttons/ConfirmInformationButton'
import { Product, CartItem } from '@/utils'
import ProductImage from '../../assets/images/product.png'
import BoardIcon from '../../assets/images/board.png'
import PillIcon from '../../assets/images/pill.png'

const { width } = Dimensions.get('window');

type Props = {
    productData: any[];
    setPhoto: (photo: { uri: string } | null) => void;
    slideNumber: number;
    moveToNextSlide: () => void;
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    backToCamera: () => void;
}

const SearchResultScreen: FC<Props> = ({
    productData,
    setPhoto,
    slideNumber,
    moveToNextSlide,
    cart,
    setCart,
    backToCamera
}) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [orderQuantity, setOrderQuantity] = useState(1);
    const [totalProductNumber, setTotalProductNumber] = useState(0);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: -slideNumber * width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [slideNumber]);

    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        setTotalProductNumber(total);
    }, [cart]);

    const increaseQuantity = () => {
        setOrderQuantity(orderQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (orderQuantity > 1) {
            setOrderQuantity(orderQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(productData, orderQuantity);
        moveToNextSlide();
    };

    const addToCart = (product: Product, quantity: number) => {
        setCart((prevCart: CartItem[]) => {
            const existingProductIndex = prevCart.findIndex((item: CartItem) => item.product.id === product.id);
            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += quantity;
                return updatedCart;
            } else {
                return [...prevCart, { product, quantity }];
            }
        });
    };

    return (
        <>
            {/* Product information section */}
            <View style={styles.productContainer}>
                {productData.map((product) => (
                    <>
                        <View style={styles.productImageWrap}>
                            <Image source={ProductImage} style={styles.productImage} />
                        </View>
                        <View style={styles.infoWrap}>
                            <View style={styles.infoCover}>
                                <View style={styles.iconWrap}>
                                    <Image source={BoardIcon} style={styles.infoIcon} />
                                </View>
                                <Text>Product Name - 50 tablets</Text>
                            </View>
                            <View style={styles.infoCover}>
                                <View style={styles.iconWrap}>
                                    <Image source={PillIcon} style={styles.infoIcon} />
                                </View>
                                <Text>Stock: <Text style={styles.stock}>29</Text></Text>
                            </View>
                        </View>
                        <View style={styles.priceWrap}>
                            <View style={styles.priceCover}>
                                <Text style={styles.priceText}>$ 23.99 / each</Text>
                            </View>
                        </View>
                    </>
                ))}
            </View>

            {/* Q&A section */}
            <Animated.View
                style={[styles.animatedView, { transform: [{ translateX: slideAnim }] }]}>
                <View style={styles.slideContainer}>
                    {slideNumber === 0 && <FoundButton setPhoto={setPhoto} moveToNextSlide={moveToNextSlide} />}
                </View>
                <View style={styles.slideContainer}>
                    {slideNumber === 1 && <BuyOrSaveButton productData={productData} setPhoto={setPhoto} moveToNextSlide={moveToNextSlide} />}
                </View>
                <View style={styles.slideContainer}>
                    {slideNumber === 2 &&
                        <SelectQuantityButton
                            productData={productData}
                            addToCart={addToCart}
                            setPhoto={setPhoto}
                            moveToNextSlide={moveToNextSlide}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            orderQuantity={orderQuantity}
                            handleAddToCart={handleAddToCart}
                        />
                    }
                </View>
                <View style={styles.slideContainer}>
                    {slideNumber === 3 &&
                        <CheckoutButton
                            cart={cart}
                            setPhoto={setPhoto}
                            moveToNextSlide={moveToNextSlide}
                            backToCamera={backToCamera}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            orderQuantity={orderQuantity}
                        />
                    }
                </View>
                <View style={styles.slideContainer}>
                    {slideNumber === 4 && <ConfirmCostButton setPhoto={setPhoto} moveToNextSlide={moveToNextSlide} />}
                </View>
                <View style={styles.slideContainer}>
                    {slideNumber === 5 && <ConfirmInformationButton setPhoto={setPhoto} moveToNextSlide={moveToNextSlide} />}
                </View>
            </Animated.View >
        </>
    )
}

export default SearchResultScreen

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: '100%',
        minHeight: '100%',
    },
    productContainer: {
        width: 380,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 34,
    },
    productImageWrap: {
        minWidth: '100%',
        maxHeight: 150,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginBottom: 20,
        overflow: 'hidden',
        borderRadius: 20,
        backgroundColor: '#C9D3DB',
    },
    productImage: {
        width: 100,
        resizeMode: 'contain',
    },
    infoWrap: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    infoCover: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: 'regular',
    },
    iconWrap: {
        width: 12,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10,
    },
    infoIcon: {
        width: 12,
        height: 20,
        resizeMode: 'contain'
    },
    stock: {
        color: '#002020',
        fontSize: 16,
        fontWeight: 'bold',
    },
    priceWrap: {
        width: '100%',
        height: 'auto',
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
    },
    priceText: {
        color: '#002020',
        fontSize: 14,
        textAlign: 'right',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    animatedView: {
        width: width,
        height: 350,
        flexDirection: 'row',
        alignItems: 'center',
    },
    slideContainer: {
        width: width,
    }
});