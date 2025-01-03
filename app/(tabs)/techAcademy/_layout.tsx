import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useLocalSearchParams } from 'expo-router';

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            title: 'TechAcademy'
        }} />
        <Stack.Screen name="[id]" options={{
            title: 'Post details'
        }} />
    </Stack>
  )
}