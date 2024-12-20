import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function _layout() {
  const router = useRouter();
   // Logout function
   const handleLogout = async () => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem('userToken');

      // Optionally show a confirmation alert
      Alert.alert('Logged Out', 'You have been logged out successfully.');

      // Redirect user to login screen
      router.push('/');  // Adjust path as per your app's login route
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while logging out.');
    }
  };
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            title: 'RocketStudent',
            headerRight: ()=>(
               // Button to trigger logout
            <Button title="Logout" onPress={handleLogout} />
          ),
        }} />
        <Stack.Screen name="[id]" options={{
            title: 'Post details'
        }} />
           <Stack.Screen name="addCourse" options={{
            title: 'Agregar Curso'
        }} />
    </Stack>
  )
}