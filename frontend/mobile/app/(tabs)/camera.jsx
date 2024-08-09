import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera/legacy';
import { StatusBar } from 'expo-status-bar';
import OptionButton from '../../components/buttons/OptionButton';
import UploadButton from '../../components/buttons/UploadButton';

export default function CameraComponent() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploadedImage, setUploadedImage] = useState('');
  const [isUploadedImage, setIsUploadedImage] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (uploadedImage) {
      setIsUploadedImage(true);
      setPhoto({ uri: uploadedImage });
    }
  }, [uploadedImage]);

  const takePic = async () => {
    setIsUploadedImage(false);

    if (!cameraRef.current) return;

    const options = {
      quality: 1,
      base64: false,
      exif: false,
    };

    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }

  if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      {photo ? (
        <SafeAreaView style={styles.container}>
          <Image style={styles.preview} source={{ uri: photo.uri }} />
          <OptionButton
            photo={photo}
            setPhoto={setPhoto}
            hasCameraPermission={hasCameraPermission}
            hasMediaLibraryPermission={hasMediaLibraryPermission}
            isUploadedImage={isUploadedImage}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.buttonsCover}>
          <View style={styles.shootButtonWrap}>
            <TouchableOpacity onPress={takePic} style={styles.shootButton}></TouchableOpacity>
          </View>
          <UploadButton setUploadedImage={setUploadedImage} />
        </View>
      )}
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonsCover: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  shootButtonWrap: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#60969A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shootButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#60969A',
    borderWidth: 2,
    borderColor: '#F5F8FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
});