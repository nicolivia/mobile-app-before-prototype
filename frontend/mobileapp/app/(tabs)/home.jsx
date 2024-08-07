
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Just take a picture and start looking!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
