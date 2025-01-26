import { View, Alert } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Text, Searchbar, IconButton, MD3Colors, FAB } from 'react-native-paper';

export default function _layout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'RocketBabies',
        headerRight: () => (


          <IconButton
            icon="rocket"
            size={24}
            iconColor="#6200ee"
            style={{ height: 56, width: 56, justifyContent: "center", alignItems: "center" }}
            onPress={() => router.push('/Perfil')}
          />

        ),
      }} />
      <Stack.Screen name="[id]" options={{
        title: 'Post details'
      }} />


    </Stack>
  )
}