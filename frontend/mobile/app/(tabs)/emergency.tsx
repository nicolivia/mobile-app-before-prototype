import React from 'react'
import { View, Text, StatusBar } from '../../components/index'

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl text-center">Welcome, Just take a picture and start looking!</Text>
      <StatusBar barStyle="default" />
    </View>
  );
}
