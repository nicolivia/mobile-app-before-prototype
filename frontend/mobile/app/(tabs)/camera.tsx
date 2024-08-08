import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, Button, Image } from '../../components/index';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera/legacy';

export default function CameraScreen() {
  const cameraRef = useRef<Camera>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | undefined>(undefined);
  const [photo, setPhoto] = useState<{ uri: string, base64?: string } | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text className="text-center mt-4">Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text className="text-center mt-4">Permission for camera not granted. Please change this in settings.</Text>;
  }

  const takePic = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: false };
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  if (photo) {
    const sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    const savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Image className="flex-1 self-stretch" source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <Camera className="flex-1 items-center justify-center" ref={cameraRef}>
        <View className="bg-white self-end p-2">
          <Button title="Take a Picture" onPress={takePic} />
        </View>
        <StatusBar style="auto" />
      </Camera>
    </>
  );
}