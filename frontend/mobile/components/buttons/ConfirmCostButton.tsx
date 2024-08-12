import { FC, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ConfirmModal from '../modals/ConfirmModal'

type Props = {
    setPhoto: (photo: { uri: string } | null) => void;
    moveToNextSlide: () => void;
}

const ConfirmCostButton: FC<Props> = ({ setPhoto, moveToNextSlide }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true)
    }

    return (
        <>
            <Text style={styles.question}>Would you buy this now?</Text>
            <View style={styles.buttonWrap}>
                <TouchableOpacity onPress={showModal} style={styles.button}>
                    <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={moveToNextSlide} style={styles.button}>
                    <Text style={styles.text}>Buy now</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for confirmation */}
            {modalVisible && (
                <ConfirmModal question='Are you sure?' setPhoto={setPhoto} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            )}
        </>
    )
}

export default ConfirmCostButton

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