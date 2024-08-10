import { FC, useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Animated, Dimensions, PanResponder } from 'react-native'
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'
import SearchResultScreen from '../screens/SearchResultScreen'
import CloseIcon from '../../assets/images/close.png'

const { height } = Dimensions.get('window');

type Props = {
    photo: { uri: string } | null;
    setPhoto: (photo: { uri: string } | null) => void;
    hasCameraPermission: null;
    hasMediaLibraryPermission: null;
    isUploadedImage: boolean;
};

const OptionButton: FC<Props> = ({ photo, setPhoto, hasCameraPermission, hasMediaLibraryPermission, isUploadedImage }) => {
    const [hasFound, setHasFound] = useState(false);
    const [productName, setProductName] = useState('');
    const slideAnim = useRef(new Animated.Value(height)).current;
    const [isVisible, setIsVisible] = useState(false);

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
            // Simulate searching and finding the product
            console.log('Found!');
            setHasFound(true);
            slideUp(); // Move the slideUp call here after setting hasFound to true
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
        });
    };
    return (
        <>
            <View style={styles.optionButtonsContainer}>
                <TouchableOpacity onPress={sharePhoto} style={styles.optionButton}>
                    <Text style={styles.optionButtonText}>Share</Text>
                </TouchableOpacity>
                {hasMediaLibraryPermission && !isUploadedImage ? (
                    <TouchableOpacity onPress={savePhoto} style={styles.optionButton}>
                        <Text style={styles.optionButtonText}>Save</Text>
                    </TouchableOpacity>
                ) : null}
                {photo ? (
                    <TouchableOpacity onPress={searchPhoto} style={styles.optionButton}>
                        <Text style={styles.optionButtonText}>Search</Text>
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity onPress={() => setPhoto(null)} style={styles.optionButton}>
                    <Text style={styles.optionButtonText}>Discard</Text>
                </TouchableOpacity>
            </View>

            {isVisible && (
                <Animated.View
                    style={[styles.animatedView, { transform: [{ translateY: slideAnim }] }]}
                    {...panResponder.panHandlers}
                >
                    <TouchableOpacity onPress={slideDown} style={styles.closeIconWrap}>
                        <Image source={CloseIcon} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <SearchResultScreen setPhoto={setPhoto} />
                </Animated.View>
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
        height: '90%',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    closeIconWrap: {
        width: '100%',
        height: 35,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    closeIcon: {
        width: 10,
        height: 10,
        padding: 8,
        marginTop: 15,
        marginRight: 18,
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
        width: 100,
        height: 50,
        backgroundColor: '#60969A',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    optionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'regular',
    },
});