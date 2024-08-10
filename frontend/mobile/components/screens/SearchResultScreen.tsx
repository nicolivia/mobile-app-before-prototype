import React, { FC } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import ProductImage from '../../assets/images/product.png'
import BoardIcon from '../../assets/images/board.png'
import PillIcon from '../../assets/images/pill.png'

type Props = {
    setPhoto: (photo: { uri: string } | null) => void;
}

const SearchResultScreen: FC<Props> = ({ setPhoto }) => {
    const router = useRouter();


    const tryAgainTakePic = () => {
        setPhoto(null)
    }

    const moveOnNextScreen = () => {
        console.log('next page')
    }

    return (
        <>
            {/* Product information section */}
            <View style={styles.productContainer}>
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
            </View>

            {/* Q&A section */}
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

export default SearchResultScreen

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: '100%',
        minHeight: '100%',
        backgroundColor: '#EBF1F6',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    productContainer: {
        width: 380,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginTop: 25,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EBF1F6',
        borderRadius: 30,
    },
    productImageWrap: {
        minWidth: '100%',
        maxHeight: 240,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginBottom: 10,
        marginHorizontal: 0,
        overflow: 'hidden',
        borderRadius: 20,
        backgroundColor: '#EBF1F6',
    },
    productImage: {
        width: 100,
        height: '100%',
        resizeMode: 'contain',
    },
    infoWrap: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        width: 20,
        height: 30,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoIcon: {
        width: 12,
        height: 20,
        resizeMode: 'contain'
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
        width: 100,
        height: 50,
        backgroundColor: '#60969A',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    text: {
        color: '#EBF1F6',
        fontSize: 16,
        fontWeight: '500',
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