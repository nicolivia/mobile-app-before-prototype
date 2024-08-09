import { FC } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UploadIcon from '../../assets/images/grid.png';

type Props = {
    setUploadedImage: (uri: string) => void;
};

const UploadButton: FC<Props> = ({ setUploadedImage }) => {
    const uploadImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setUploadedImage(result.assets[0].uri);
        }
    };

    return (
        <>
            <TouchableOpacity onPress={uploadImage} style={styles.uploadButtonWrap}>
                <Image source={UploadIcon} style={styles.icon} />
            </TouchableOpacity>
        </>
    );
};

export default UploadButton;

const styles = StyleSheet.create({
    uploadButtonWrap: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    icon: {
        width: 15,
        height: 15,
    },
});