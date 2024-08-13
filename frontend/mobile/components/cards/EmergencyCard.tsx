import React, { FC, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Linking } from 'react-native';
import { Emergency } from '../../utils/index'
import { BlurView } from 'expo-blur'
import PharmacyImage from '../../assets/images/pharmacy.png'
import AmbulanceImage from '../../assets/images/ambulance.png'
import HospitalImage from '../../assets/images/hospital.png'
import GPImage from '../../assets/images/gp.png'
import MoreIcon from '../../assets/images/more-dots.png'

const cardImages = [
    { id: 1, image: PharmacyImage },
    { id: 2, image: AmbulanceImage },
    { id: 3, image: HospitalImage },
    { id: 4, image: GPImage },
];

type Props = {
    data: Emergency;
};

const EmergencyCard: FC<Props> = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [imageId, setImageId] = useState(data.id);
    const [title, setTitle] = useState(data.title);
    const [address, setAddress] = useState(data.address);
    const [phone, setPhone] = useState(data.phone);

    const handleMorePress = () => {
        setModalVisible(true);
    };

    const handleImageChange = (newImageId) => {
        setImageId(newImageId);
    };

    const handleSave = async () => {
        const updatedData = {
            id: imageId,
            title: title,
            address: address,
            phone: phone,
        };

        try {
            const response = await fetch(`http://localhost/5000/api/contacts/save/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                console.log('Data updated successfully');
            } else {
                console.error('Failed to update data');
            }
        } catch (error) {
            console.error('An error occurred', error);
        } finally {
            setModalVisible(false);
        }
    };

    const handleCall = () => {
        const url = `tel:${phone}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    alert('Phone call is not supported on this device.');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    return (
        <>
            <View style={styles.card}>
                <Image source={cardImages.find(img => img.id === data.id)?.image} style={styles.cardImage} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.address}>{address}</Text>
                </View>
                <TouchableOpacity onPress={handleCall} style={styles.phoneCover}>
                    <Text style={styles.phone}>{phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleMorePress} style={styles.moreIconCover}>
                    <Image source={MoreIcon} style={styles.moreIcon} />
                </TouchableOpacity>
            </View >

            {/* Modal for Editing */}
            < Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <BlurView style={styles.blurContainer} intensity={20}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalButtons}>
                                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                                <Button title="Save" onPress={handleSave} />
                            </View>
                            <Image source={cardImages.find(img => img.id === data.id)?.image} style={styles.modalImage} />
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Enter new place name"
                            />
                            <TextInput
                                style={styles.input}
                                value={address}
                                onChangeText={setAddress}
                                placeholder="Enter new address"
                            />
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="Enter new phone number"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                </BlurView>
            </Modal >
        </>
    );
};

export default EmergencyCard;

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 270,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        shadowColor: '#757575',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    cardImage: {
        width: 90,
        height: 90,
        marginVertical: 10,
    },
    infoContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    phoneCover: {
        margin: 10,
        backgroundColor: '#F7F7F7',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1 / 3,
        borderColor: '#CFCFCF',
        shadowColor: '#757575',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    phone: {
        width: 150,
        fontSize: 18,
        fontWeight: '600',
        color: '#60969A',
        textAlign: 'center',
    },
    moreIconCover: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    },
    moreIcon: {
        width: 3,
        resizeMode: 'contain',
    },
    blurContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',

    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalImage: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});