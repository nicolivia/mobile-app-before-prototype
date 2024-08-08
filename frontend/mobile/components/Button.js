import React from 'react';
import { Text, TouchableOpacity } from '../components/index';
import { Entypo } from '@expo/vector-icons';

export default function Button({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} className="h-10 flex-row items-center justify-center bg-blue-500 rounded">
      <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
      <Text className="font-bold text-lg text-white ml-2">{title}</Text>
    </TouchableOpacity>
  );
}

