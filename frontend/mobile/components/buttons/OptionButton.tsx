import { FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

type Props = {
    photo: { uri: string } | null;
    setPhoto: (photo: { uri: string } | null) => void;
    hasCameraPermission: null;
    hasMediaLibraryPermission: null;
    isUploadedImage: boolean;
};

const OptionButton: FC<Props> = ({ photo, setPhoto, hasCameraPermission, hasMediaLibraryPermission, isUploadedImage }) => {
    const sharePic = () => {
        if (photo) {
            shareAsync(photo.uri).then(() => setPhoto(null));
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
                setPhoto(null);
            }
        } catch (error) {
            console.log('Error saving photo:', error);
        }
    };

    if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
        return <Text>Requesting permissions...</Text>;
    }

    if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>;
    }

    return (
        <View style={styles.optionButtonsContainer}>
            <TouchableOpacity onPress={sharePic} style={styles.optionButton}>
                <Text style={styles.optionButtonText}>Share</Text>
            </TouchableOpacity>
            {hasMediaLibraryPermission && !isUploadedImage ? (
                <TouchableOpacity onPress={savePhoto} style={styles.optionButton}>
                    <Text style={styles.optionButtonText}>Save</Text>
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={() => setPhoto(null)} style={styles.optionButton}>
                <Text style={styles.optionButtonText}>Discard</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OptionButton;

const styles = StyleSheet.create({
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