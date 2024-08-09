import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera/legacy';
import { StatusBar } from 'expo-status-bar';

export default function CameraComponent() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: false,  // Do not include base64 in the URI
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  const sharePic = () => {
    shareAsync(photo.uri).then(() => {
      setPhoto(null);
    });
  };

  const savePhoto = async () => {
    try {
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      const album = await MediaLibrary.getAlbumAsync('MyAppPhotos');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('MyAppPhotos', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      console.log('Photo saved successfully!');
      setPhoto(null);
    } catch (error) {
      console.log('Error saving photo:', error);
    }
  };

  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: photo.uri }} />
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity onPress={sharePic} style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Share</Text>
          </TouchableOpacity>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity onPress={savePhoto} style={styles.optionButton}>
              <Text style={styles.optionButtonText}>Save</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={() => setPhoto(null)} style={styles.optionButton}>
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
    backgroundColor: '#60969A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
