import { FC, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import ConfirmModal from '../modals/ConfirmModal'

type Props = {
    setPhoto: (photo: { uri: string } | null) => void;
    moveToNextSlide: () => void;
}

const FoundButton: FC<Props> = ({ setPhoto, moveToNextSlide }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const showConfirmModal = () => {
        setModalVisible(true)
    }

    return (
        <>
            <Text style={styles.question}>Is this product you are looking for?</Text>
            <View style={styles.buttonWrap}>
                <TouchableOpacity onPress={showConfirmModal} style={styles.button}>
                    <Text style={styles.text}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={moveToNextSlide} style={styles.button}>
                    <Text style={styles.text}>Yes</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for confirmation */}
            {modalVisible && (
                <ConfirmModal question='Would you try it again?' setPhoto={setPhoto} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            )}
        </>
    )
}

export default FoundButton

const styles = StyleSheet.create({
    question: {
        width: '100%',
        color: '#002020',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
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