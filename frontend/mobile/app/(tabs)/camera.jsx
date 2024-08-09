import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera/legacy';
import { StatusBar } from 'expo-status-bar';
import UploadIcon from '../../assets/images/upload.png';

export default function CameraComponent() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  const uploadImage = () => {
    console.log('uploading image');
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity onPress={sharePic} style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Share</Text>
          </TouchableOpacity>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity onPress={savePhoto} style={styles.optionButton}>
              <Text style={styles.optionButtonText}>Save</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={() => setPhoto(undefined)} style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Discard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonsCover}>
        <View style={styles.shootButtonWrap}>
          <TouchableOpacity onPress={takePic} style={styles.shootButton}>
            <Text style={styles.shootButtonText}></Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={uploadImage} style={styles.uploadButtonWrap}>
          <Image source={UploadIcon} style={styles.icon} />
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>
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
  shootButtonText: {
    color: '#60969A',
    fontWeight: 'bold',
  },
  uploadButtonWrap: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 80,
    height: 40,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  uploadText: {
    fontSize: 12,
    color: '#000',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  optionButtonsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  optionButton: {
    width: 100,
    height: 50,
    backgroundColor: '#60969A', // Custom background color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  optionButtonText: {
    color: '#fff', // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold',
  },
});
