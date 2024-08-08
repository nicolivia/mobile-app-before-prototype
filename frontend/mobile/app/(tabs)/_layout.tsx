import React from 'react'
import { Tabs } from 'expo-router'
import { CiMedicalCross, CiCamera, CiUser } from 'react-icons/ci'
import { Colors } from '../../constants/Colors'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.light.icon }}
    >
      <Tabs.Screen name='emergency'
        options={{
          tabBarLabel: 'Emergency',
          tabBarIcon: ({ color }) => <CiMedicalCross size={24} color={color} />
        }}
      />
      <Tabs.Screen name='camera'
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color }) => <CiCamera size={24} color={color} />
        }}
      />
      <Tabs.Screen name='profile'
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <CiUser size={24} color={color} />
        }}
      />
    </Tabs>
  );
}
