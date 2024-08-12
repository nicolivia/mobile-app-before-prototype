import { FC } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { BlurView } from 'expo-blur';

type Props = {
    question: string;
    setPhoto: (photo: { uri: string } | null) => void;
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

const ConfirmModal: FC<Props> = ({ question, setPhoto, modalVisible, setModalVisible }) => {

    const confirmYes = () => {
        setPhoto(null);
        setModalVisible(false);
    }

    const confirmNo = () => {
        setModalVisible(false);
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={confirmYes}
            >
                <BlurView style={styles.blurContainer} intensity={7}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>{question}</Text>
                            <View style={styles.modalButtonWrap}>
                                <TouchableOpacity onPress={confirmNo} style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={confirmYes} style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </BlurView>
            </Modal >
        </>
    )
}

export default ConfirmModal

const styles = StyleSheet.create({
    blurContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
    },
    modalButtonWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        width: '45%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#60969A',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});
