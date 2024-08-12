import { FC, useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native'
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'
import SearchResultScreen from '../screens/SearchResultScreen'
import ConfirmModal from '../modals/ConfirmModal'
import { CartItem, Product } from '@/utils'
import CloseIcon from '../../assets/images/close.png'
import BinIcon from '../../assets/images/bin.png'
import ShareIcon from '../../assets/images/share.png'
import SaveIcon from '../../assets/images/saveW.png'
import SearchIcon from '../../assets/images/searchW.png'
import ArrowLeftIcon from '../../assets/images/arrow-left.png'

const { height } = Dimensions.get('window');

type Props = {
    photo: { uri: string } | null;
    setPhoto: (photo: { uri: string } | null) => void;
    hasCameraPermission: null;
    hasMediaLibraryPermission: null;
    isUploadedImage: boolean;
};

const OptionButton: FC<Props> = ({ photo, setPhoto, hasCameraPermission, hasMediaLibraryPermission, isUploadedImage }) => {
    const slideAnim = useRef(new Animated.Value(height)).current;
    const [productData, setProductData] = useState<any[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [slideNumber, setSlideNumber] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const totalSlides = 5;

    const sharePhoto = async () => {
        if (photo) {
            try {
                await shareAsync(photo.uri);
                setPhoto(photo)
            } catch (error) {
                console.log('Error sharing photo:', error);
            }
        }
    };

    const savePhoto = async () => {
        try {
            if (photo) {
                const asset = await MediaLibrary.createAssetAsync(photo.uri);
                const album = await MediaLibrary.getAlbumAsync('MyAppPhotos');
                if (album == null) {
                    await MediaLibrary.createAlbumAsync('MyAppPhotos', asset, false);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }
                console.log('Photo saved successfully!');
            }
        } catch (error) {
            console.log('Error saving photo:', error);
        }
    };

    const searchPhoto = () => {
        try {
            const product = 'await the product data from server'
            productData.push({
                id: 'product.id',
                name: 'product.productName',
                image: 'product.image',
                price: 'product.price',
                stock: 'product.stock',

                // id: number;
                // image: string;
                // productName: string;
                // brandName: string;
                // genericName: string;
                // manufacturer: string;
                // price: number;
                // stock: number;
            })

            if (product) {
                setIsVisible(true)
                slideUp();
            } else {
                alert('Product not found');
                setIsVisible(false)
            }
        } catch (error) {
            console.log('Error searching photo:', error);
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
            onPanResponderMove: (_, gestureState) => {
                slideAnim.setValue(gestureState.moveY);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    slideDown();
                } else {
                    slideUp();
                }
            },
        })
    ).current;

    const confirmDelete = () => {
        setModalVisible(true);
    };

    const slideUp = () => {
        setIsVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsVisible(false);
            setSlideNumber(0);
        });
    };

    const moveToNextSlide = () => {
        if (slideNumber < totalSlides) {
            setSlideNumber(slideNumber + 1);
        }
    };

    const moveToPreviousSlide = () => {
        if (slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
        }
    };

    const backToCamera = () => {
        slideDown();
        setPhoto(null);
    };

    return (
        <>
            <View style={styles.optionButtonsContainer}>
                <TouchableOpacity onPress={sharePhoto} style={styles.optionButton}>
                    <View style={styles.iconWrap}>
                        <Image source={ShareIcon} style={styles.optionIcon} />
                    </View>
                    <Text style={styles.optionButtonText}>Share</Text>
                </TouchableOpacity>
                {hasMediaLibraryPermission && !isUploadedImage ? (
                    <TouchableOpacity onPress={savePhoto} style={styles.optionButtonMiddle}>
                        <View style={styles.iconWrapMiddle}>
                            <Image source={SaveIcon} style={styles.optionIconMiddle} />
                        </View>
                        <Text style={styles.optionButtonTextMiddle}>Save</Text>
                    </TouchableOpacity>
                ) : null}
                {photo ? (
                    <TouchableOpacity onPress={searchPhoto} style={styles.optionButtonMiddle}>
                        <View style={styles.iconWrapMiddle}>
                            <Image source={SearchIcon} style={styles.optionIconMiddle} />
                        </View>
                        <Text style={styles.optionButtonTextMiddle}>Search</Text>
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity onPress={backToCamera} style={styles.optionButton}>
                    <View style={styles.iconWrap}>
                        <Image source={BinIcon} style={styles.optionIcon} />
                    </View>
                    <Text style={styles.optionButtonText}>Discard</Text>
                </TouchableOpacity>
            </View>

            {isVisible && (
                <Animated.View
                    style={[styles.animatedView, { transform: [{ translateY: slideAnim }] }]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.headerIconWrap}>
                        {(slideNumber > 0) ? (
                            <TouchableOpacity onPress={moveToPreviousSlide}>
                                <View style={styles.headerIconCover}>
                                    <Image source={ArrowLeftIcon} style={styles.arrowIcon} />
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <View></View>
                        )}
                        <TouchableOpacity onPress={confirmDelete}>
                            <View style={styles.headerIconCover}>
                                <Image source={CloseIcon} style={styles.closeIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <SearchResultScreen
                        productData={productData}
                        setPhoto={setPhoto}
                        slideNumber={slideNumber}
                        moveToNextSlide={moveToNextSlide}
                        cart={cart}
                        setCart={setCart}
                        backToCamera={backToCamera}
                    />
                </Animated.View>
            )}

            {/* Modal for confirmation */}
            {modalVisible && (
                <ConfirmModal question='Would you go back to camera?' setPhoto={setPhoto} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            )}
        </>
    );
};

export default OptionButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    animatedView: {
        position: 'absolute',
        width: '100%',
        height: '92%',
        backgroundColor: '#EBF1F6',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerIconWrap: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
    },
    headerIconCover: {
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: '#C9D3DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        width: 10,
        height: 10,
        resizeMode: 'contain'
    },
    arrowIcon: {
        width: 15,
        height: 13,
        resizeMode: 'contain'
    },
    optionButtonsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginVertical: 20,
        marginHorizontal: 'auto',
    },
    optionButton: {
        width: 70,
        height: 70,
        backgroundColor: '#EBF1F6',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    optionButtonText: {
        color: '#002020',
        fontSize: 10,
        fontWeight: '300',
        marginTop: 10,
    },
    iconWrap: {
        width: 17,
        height: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionIcon: {
        width: 17,
        height: 17,
        resizeMode: 'contain'
    },
    optionButtonMiddle: {
        width: 90,
        height: 90,
        backgroundColor: '#60969A',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    optionButtonTextMiddle: {
        color: '#EBF1F6',
        fontSize: 12,
        fontWeight: '400',
        marginTop: 10,
    },
    iconWrapMiddle: {
        width: 23,
        height: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionIconMiddle: {
        width: 23,
        height: 23,
        resizeMode: 'contain'
    },
});