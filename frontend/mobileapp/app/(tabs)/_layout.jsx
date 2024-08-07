import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from './../../constants/Colors'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
    }}>
      <Tabs.Screen name='home'
      options={{
          tabBarLabel:'Home',
          tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
          }}
      />
      <Tabs.Screen name='camera'
      options={{
          tabBarLabel:'Camera',
          tabBarIcon:({color})=><Ionicons name="camera" size={24} color={color} />
          }}
      />
      <Tabs.Screen name='profile'
      options={{
          tabBarLabel:'profile',
          tabBarIcon:({color})=><Ionicons name="people" size={24} color={color} />
          }}
      />

    </Tabs>
  )
}