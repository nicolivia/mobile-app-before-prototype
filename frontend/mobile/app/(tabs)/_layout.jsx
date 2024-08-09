import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function TabBarIcon({ name, color }) {
  return <MaterialCommunityIcons name={name} size={24} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="account" color={color} />,
        }}
      />
    </Tabs>
  );
}